import { ChartAreaInteractive } from '@/components/chart-area-interactive';
import { ActiveProjects } from '@/components/dashboard/active-projects';
import { RecentContracts } from '@/components/dashboard/recent-contracts';
import { SubscriptionReminder } from '@/components/dashboard/subscription-reminder';
import { SectionCards } from '@/components/section-cards';

import data from './data.json';

export default function Page() {
  return (
    <>
      <SectionCards />
      <div className='grid grid-cols-1 @5xl/main:grid-cols-2 gap-4'>
        <ChartAreaInteractive />
        <ActiveProjects />
        <RecentContracts data={data} />
        <SubscriptionReminder data={data} />
      </div>
    </>
  );
}
