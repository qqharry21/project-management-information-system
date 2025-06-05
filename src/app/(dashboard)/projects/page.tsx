import { createClient } from '@/lib/supabase/server';
import type { Metadata } from 'next';
import ProjectDashboard from './project-dashboard';

export const metadata: Metadata = {
  title: '專案管理',
  description: '在這裡管理並追蹤所有專案',
};

export default async function Page() {
  const supabase = await createClient();
  const { data: projects, error } = await supabase
    .from('projects')
    .select('*, clients(name)')
    .order('created_at', { ascending: false });
  console.log('🚨 - projects', projects);

  if (error) {
    console.error('🚨 - error', error);
    return <div className='text-destructive'>Failed to load projects.</div>;
  }

  return <ProjectDashboard projects={projects || []} />;
}
