import ProjectDashboard from '@/components/projects/project-dashboard';
import { ProjectHeader } from '@/components/projects/project-header';
import { createClient } from '@/lib/supabase/server';
import { getProjects } from '@/queries/get-projects';
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { getTranslations } from 'next-intl/server';

export const generateMetadata = async () => {
  const t = await getTranslations();
  return {
    title: t('Dashboard.project_management'),
    description: t('Dashboard.project_management_desc'),
  };
};

export default async function Page() {
  const supabase = await createClient();

  const queryClient = new QueryClient();
  await prefetchQuery(queryClient, getProjects(supabase));

  return (
    <>
      <ProjectHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProjectDashboard />
      </HydrationBoundary>
    </>
  );
}
