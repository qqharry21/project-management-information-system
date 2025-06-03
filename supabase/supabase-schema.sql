-- Project Management Information System Supabase Schema
-- Paste this file into the Supabase SQL editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. ENUMS
create type role_type as enum ('admin', 'project_manager', 'team_member');
create type project_status as enum ('active', 'completed', 'on_hold', 'cancelled');
create type contract_status as enum ('draft', 'signed', 'active', 'expired', 'cancelled');
create type invoice_status as enum ('draft', 'sent', 'paid', 'overdue', 'cancelled');
create type quotation_status as enum ('draft', 'sent', 'accepted', 'rejected');
create type timeline_event_type as enum ('milestone', 'task', 'meeting');

-- 2. USERS & PROFILES
create table users (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text unique,
  role role_type not null default 'team_member',
  created_at timestamp with time zone default timezone('utc'::text, now())
);

create table user_profiles (
  user_id uuid primary key references users(id) on delete cascade,
  phone text,
  avatar_url text,
  organization text,
  is_active boolean default true
);

-- 3. PROJECTS & TEAM
create table projects (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  start_date date,
  end_date date,
  status project_status not null default 'active',
  created_at timestamp with time zone default timezone('utc'::text, now())
);

create table project_team_members (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid references projects(id) on delete cascade,
  user_id uuid references users(id) on delete cascade,
  role role_type not null default 'team_member',
  joined_at timestamp with time zone default timezone('utc'::text, now())
);

-- 4. PROJECT FILES
create table project_files (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid references projects(id) on delete cascade,
  file_url text not null,
  file_type text,
  uploaded_by uuid references users(id) on delete set null,
  uploaded_at timestamp with time zone default timezone('utc'::text, now())
);

-- 5. CONTRACTS
create table contracts (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid references projects(id) on delete set null,
  contract_number text unique,
  title text,
  status contract_status not null default 'draft',
  signed_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 6. FINANCE: INCOME, EXPENSES, INVOICES, QUOTATIONS
create table income (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid references projects(id) on delete set null,
  amount numeric not null,
  source text,
  received_at date,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

create table expenses (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid references projects(id) on delete set null,
  amount numeric not null,
  category text,
  paid_at date,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

create table invoices (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid references projects(id) on delete set null,
  invoice_number text unique,
  amount numeric not null,
  status invoice_status not null default 'draft',
  issued_at date,
  due_date date,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

create table quotations (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid references projects(id) on delete set null,
  quotation_number text unique,
  amount numeric not null,
  status quotation_status not null default 'draft',
  issued_at date,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 7. PROJECT TIMELINE EVENTS
create table project_timeline_events (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid references projects(id) on delete cascade,
  title text not null,
  description text,
  start_date date,
  end_date date,
  type timeline_event_type not null default 'task',
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 8. CLOSURE REPORTS
create table closure_reports (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid references projects(id) on delete cascade,
  report_url text not null,
  submitted_by uuid references users(id) on delete set null,
  submitted_at timestamp with time zone default timezone('utc'::text, now())
);

-- 9. SUBSCRIPTION TRACKING
create table subscription_tracking (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid references projects(id) on delete cascade,
  service_name text not null,
  start_date date not null,
  renewal_date date not null,
  status text not null check (status in ('active', 'expired', 'cancelled')),
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Indexes for performance
create index on project_team_members (project_id, user_id);
create index on project_files (project_id);
create index on contracts (project_id);
create index on invoices (project_id);
create index on quotations (project_id);
create index on subscription_tracking (project_id);

-- RLS and Policies for Internal Use Only
-- Enable RLS on all tables
alter table users enable row level security;
alter table user_profiles enable row level security;
alter table projects enable row level security;
alter table project_team_members enable row level security;
alter table project_files enable row level security;
alter table contracts enable row level security;
alter table income enable row level security;
alter table expenses enable row level security;
alter table invoices enable row level security;
alter table quotations enable row level security;
alter table project_timeline_events enable row level security;
alter table closure_reports enable row level security;
alter table subscription_tracking enable row level security;

-- users
create policy "Users can view their own user row"
  on users for select
  using (id = auth.uid());

create policy "Users can update their own user row"
  on users for update
  using (id = auth.uid());

create policy "Admins can manage all users"
  on users for all
  using (exists (select 1 from users u where u.id = auth.uid() and u.role = 'admin'));

-- user_profiles
create policy "Users can view their own profile"
  on user_profiles for select
  using (user_id = auth.uid());

create policy "Users can update their own profile"
  on user_profiles for update
  using (user_id = auth.uid());

create policy "Admins can manage all profiles"
  on user_profiles for all
  using (exists (select 1 from users u where u.id = auth.uid() and u.role = 'admin'));

-- projects
create policy "Admins and PMs can manage all projects"
  on projects for all
  using (exists (select 1 from users u where u.id = auth.uid() and u.role in ('admin', 'project_manager')));

create policy "Team members can view assigned projects"
  on projects for select
  using (exists (
    select 1 from project_team_members ptm
    where ptm.project_id = projects.id and ptm.user_id = auth.uid()
  ));

-- project_team_members
create policy "Admins and PMs can manage all team members"
  on project_team_members for all
  using (exists (select 1 from users u where u.id = auth.uid() and u.role in ('admin', 'project_manager')));

create policy "Users can view their own team member rows"
  on project_team_members for select
  using (user_id = auth.uid());

-- project_files
create policy "Admins and PMs can manage all files"
  on project_files for all
  using (exists (select 1 from users u where u.id = auth.uid() and u.role in ('admin', 'project_manager')));

create policy "Team members can view files for assigned projects"
  on project_files for select
  using (exists (
    select 1 from project_team_members ptm
    where ptm.project_id = project_files.project_id and ptm.user_id = auth.uid()
  ));

-- contracts
create policy "Admins and PMs can manage all contracts"
  on contracts for all
  using (exists (select 1 from users u where u.id = auth.uid() and u.role in ('admin', 'project_manager')));

-- income
create policy "Admins and PMs can manage all income"
  on income for all
  using (exists (select 1 from users u where u.id = auth.uid() and u.role in ('admin', 'project_manager')));

create policy "Team members can view income for assigned projects"
  on income for select
  using (exists (
    select 1 from project_team_members ptm
    where ptm.project_id = income.project_id and ptm.user_id = auth.uid()
  ));

-- expenses
create policy "Admins and PMs can manage all expenses"
  on expenses for all
  using (exists (select 1 from users u where u.id = auth.uid() and u.role in ('admin', 'project_manager')));

create policy "Team members can view expenses for assigned projects"
  on expenses for select
  using (exists (
    select 1 from project_team_members ptm
    where ptm.project_id = expenses.project_id and ptm.user_id = auth.uid()
  ));

-- invoices
create policy "Admins and PMs can manage all invoices"
  on invoices for all
  using (exists (select 1 from users u where u.id = auth.uid() and u.role in ('admin', 'project_manager')));

-- quotations
create policy "Admins and PMs can manage all quotations"
  on quotations for all
  using (exists (select 1 from users u where u.id = auth.uid() and u.role in ('admin', 'project_manager')));

-- project_timeline_events
create policy "Admins and PMs can manage all timeline events"
  on project_timeline_events for all
  using (exists (select 1 from users u where u.id = auth.uid() and u.role in ('admin', 'project_manager')));

create policy "Team members can view events for assigned projects"
  on project_timeline_events for select
  using (exists (
    select 1 from project_team_members ptm
    where ptm.project_id = project_timeline_events.project_id and ptm.user_id = auth.uid()
  ));

-- closure_reports
create policy "Admins and PMs can manage all closure reports"
  on closure_reports for all
  using (exists (select 1 from users u where u.id = auth.uid() and u.role in ('admin', 'project_manager')));

create policy "Team members can view closure reports for assigned projects"
  on closure_reports for select
  using (exists (
    select 1 from project_team_members ptm
    where ptm.project_id = closure_reports.project_id and ptm.user_id = auth.uid()
  ));

-- subscription_tracking
create policy "Admins and PMs can manage all subscriptions"
  on subscription_tracking
  for all
  using (
    exists (
      select 1 from users u
      where u.id = auth.uid()
      and u.role in ('admin', 'project_manager')
    )
  );

create policy "Team members can view subscriptions for assigned projects"
  on subscription_tracking
  for select
  using (
    exists (
      select 1 from project_team_members ptm
      where ptm.project_id = subscription_tracking.project_id
      and ptm.user_id = auth.uid()
    )
  );

-- Functions
create or replace function check_user_email_exists(target_email text)
returns boolean
language sql
as $$
select exists (
  select 1 from auth.users where email = target_email
);
$$;

create or replace function handle_new_user()
returns trigger
language plpgsql
as $$
begin
  -- Insert into users table
  insert into public.users (id, email, full_name, role)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', 'team_member');

  -- Insert into user_profiles table
  insert into public.user_profiles (user_id, phone, avatar_url, organization)
  values (
    new.id,
    new.raw_user_meta_data->>'phone',
    new.raw_user_meta_data->>'avatar_url',
    new.raw_user_meta_data->>'organization'
  );

  return new;
end;
$$;

create or replace function get_user_verification_status(target_email text)
returns text
language plpgsql
as $$
declare
  exists boolean;
  verified_at timestamptz;
begin
  -- 使用你已定義的 function
  exists := check_user_email_exists(target_email);

  if not exists then
    return 'not_found';
  end if;

  -- 查詢 email_confirmed_at
  select email_confirmed_at into verified_at
  from auth.users
  where email = target_email;

  if verified_at is null then
    return 'unverified';
  else
    return 'verified';
  end if;
end;
$$;

-- Triggers
create or replace function handle_new_user()
returns trigger
language plpgsql
as $$
begin
  -- Insert into users table
  insert into public.users (id, email, full_name, role)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', 'team_member');

  -- Insert into user_profiles table
  insert into public.user_profiles (user_id, phone, avatar_url, organization)
  values (
    new.id,
    new.raw_user_meta_data->>'phone',
    new.raw_user_meta_data->>'avatar_url',
    new.raw_user_meta_data->>'organization'
  );

  return new;
end;
$$;

create or replace trigger new_user_trigger
after insert on auth.users
for each row
execute function handle_new_user();
