-- 1. Create clients table
create table if not exists clients (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  contact_person text,
  contact_email text,
  contact_phone text,
  address text,
  notes text,
  created_at timestamp with time zone default timezone('utc' :: text, now()) not null
);
-- 2. Add client_id to projects table
alter table
  projects
add
  column if not exists client_id uuid not null references clients(id) on delete restrict;
-- 3. Add client_id to contracts table
alter table
  contracts
add
  column if not exists client_id uuid not null references clients(id) on delete restrict;
-- 4. Add client_id to subscription_tracking table
alter table
  subscription_tracking
add
  column if not exists client_id uuid not null references clients(id) on delete restrict;
-- 5. Create indexes for performance
create index if not exists idx_clients_name on clients (name);
create index if not exists idx_projects_client_id on projects (client_id);
create index if not exists idx_contracts_client_id on contracts (client_id);
create index if not exists idx_subscription_tracking_client_id on subscription_tracking (client_id);
-- 6. Enable RLS on clients table
alter table
  clients enable row level security;
-- 7. Add RLS policies for clients
create policy "Admins and PMs can manage all clients" on clients for all using (
  exists (
    select
      1
    from
      users u
    where
      u.id = auth.uid()
      and u.role in ('admin', 'project_manager')
  )
);
create policy "Team members can view clients for assigned projects" on clients for
select
  using (
    exists (
      select
        1
      from
        project_team_members ptm
        join projects p on ptm.project_id = p.id
      where
        ptm.user_id = auth.uid()
        and p.client_id = clients.id
    )
  );
