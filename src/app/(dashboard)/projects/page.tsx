import { createClient } from '@/lib/supabase/server';
import ProjectDashboard from './project-dashboard';

export default async function Page() {
  const supabase = await createClient();
  const { data: projects, error } = await supabase
    .from('projects')
    .select('*, clients(name)')
    .order('created_at', { ascending: false });

  if (error) {
    console.log('🚨 - error', error);
    // TODO: Render a proper error state
    return <div className='text-destructive'>Failed to load projects.</div>;
  }

  return <ProjectDashboard projects={projects || []} />;
}
