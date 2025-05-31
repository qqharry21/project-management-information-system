'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { IconArrowUpRight } from '@tabler/icons-react';
import Link from 'next/link';

const mockProjects = [
  {
    id: 1,
    name: 'AI 智能分析平台',
    percentComplete: 60,
    dueDate: '2024-06-10',
    isOverdue: false,
  },
  {
    id: 2,
    name: '雲端文件管理',
    percentComplete: 85,
    dueDate: '2024-05-28',
    isOverdue: true,
  },
  {
    id: 3,
    name: '行動應用開發',
    percentComplete: 40,
    dueDate: '2024-07-01',
    isOverdue: false,
  },
  {
    id: 4,
    name: '自動化測試系統',
    percentComplete: 95,
    dueDate: '2024-05-25',
    isOverdue: true,
  },
];

export const ActiveProjects = () => {
  return (
    <Card className='col-span-full'>
      <CardHeader>
        <CardTitle>進行中的專案</CardTitle>
        <CardDescription>監控正在進行的專案</CardDescription>
        <CardAction>
          <Button
            variant='outline'
            asChild>
            <Link href='/subscriptions'>
              查看更多
              <IconArrowUpRight className='w-4 h-4' />
            </Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className='flex flex-col gap-4'>
        {mockProjects.map((project) => (
          <div
            key={project.id}
            className='flex flex-col gap-1 rounded-lg border p-3'>
            <div className='flex items-center justify-between'>
              <span className='font-medium'>{project.name}</span>
              {project.isOverdue && <Badge variant='secondary'>逾期</Badge>}
            </div>
            <div className='flex items-center gap-2 text-xs text-muted-foreground'>
              <span>截止日：{project.dueDate}</span>
              <span className='ml-auto'>{project.percentComplete}%</span>
            </div>
            <div className='w-full h-2 rounded bg-secondary mt-1 overflow-hidden'>
              <div
                className='h-2 rounded transition-all bg-primary'
                style={{ width: `${project.percentComplete}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
