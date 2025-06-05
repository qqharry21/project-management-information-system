import { Badge } from '@/components/ui/badge';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { ColumnDef } from '@tanstack/react-table';
import { cva } from 'class-variance-authority';
import { ProjectWithClient } from './project-dashboard';

export const statusVariants = cva('', {
  variants: {
    status: {
      active: 'bg-green-100 text-green-800',
      completed: 'bg-blue-100 text-blue-800',
      on_hold: 'bg-yellow-100 text-yellow-800',
      planning: 'bg-gray-100 text-gray-800',
      cancelled: 'bg-red-100 text-red-800',
    },
  },
  defaultVariants: {
    status: 'active',
  },
});

type ProjectStatus = ProjectWithClient['status'];

export const columns: ColumnDef<ProjectWithClient>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <div
        className='flex items-center gap-1 cursor-pointer select-none'
        onClick={column.getToggleSortingHandler()}>
        {'專案名稱'}
        {column.getIsSorted() === 'asc' ? (
          <span>
            <IconChevronUp className='h-4 w-4' />
          </span>
        ) : column.getIsSorted() === 'desc' ? (
          <span>
            <IconChevronDown className='h-4 w-4' />
          </span>
        ) : (
          <span className='opacity-0'>
            <IconChevronDown className='h-4 w-4' />
          </span>
        )}
      </div>
    ),
    cell: (info) => (
      <div>
        <div className='font-medium'>{info.getValue() as string}</div>
        <div className='text-sm text-muted-foreground'>
          {(info.row.original as ProjectWithClient).description}
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <div
        className='flex items-center gap-1 cursor-pointer select-none'
        onClick={column.getToggleSortingHandler()}>
        <span>狀態</span>
        {column.getIsSorted() === 'asc' ? (
          <span>
            <IconChevronUp className='h-4 w-4' />
          </span>
        ) : column.getIsSorted() === 'desc' ? (
          <span>
            <IconChevronDown className='h-4 w-4' />
          </span>
        ) : (
          <span className='opacity-0'>
            <IconChevronDown className='h-4 w-4' />
          </span>
        )}
      </div>
    ),
    cell: (info) => (
      <Badge
        className={statusVariants({
          status: info.getValue() as ProjectStatus,
        })}>
        {info.getValue() as string}
      </Badge>
    ),

    filterFn: 'equals',
  },
  {
    accessorKey: 'clients.name',
    header: '客戶',
    cell: (info) => info.row.original.clients?.name || '-',
  },
  {
    accessorKey: 'start_date',
    header: ({ column }) => (
      <div
        className='flex items-center gap-1 cursor-pointer select-none'
        onClick={column.getToggleSortingHandler()}>
        {'開始日期'}
        {column.getIsSorted() === 'asc' ? (
          <span>
            <IconChevronUp className='h-4 w-4' />
          </span>
        ) : column.getIsSorted() === 'desc' ? (
          <span>
            <IconChevronDown className='h-4 w-4' />
          </span>
        ) : (
          <span className='opacity-0'>
            <IconChevronDown className='h-4 w-4' />
          </span>
        )}
      </div>
    ),
    cell: (info) =>
      info.getValue()
        ? new Date(info.getValue() as string).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })
        : '-',
  },
  {
    accessorKey: 'end_date',
    header: ({ column }) => (
      <div
        className='flex items-center gap-1 cursor-pointer select-none'
        onClick={column.getToggleSortingHandler()}>
        {'結束日期'}
        {column.getIsSorted() === 'asc' ? (
          <span>
            <IconChevronUp className='h-4 w-4' />
          </span>
        ) : column.getIsSorted() === 'desc' ? (
          <span>
            <IconChevronDown className='h-4 w-4' />
          </span>
        ) : (
          <span className='opacity-0'>
            <IconChevronDown className='h-4 w-4' />
          </span>
        )}
      </div>
    ),
    cell: (info) =>
      info.getValue()
        ? new Date(info.getValue() as string).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })
        : '-',
  },
];
