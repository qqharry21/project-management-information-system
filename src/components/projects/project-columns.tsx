import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  IconCalendar,
  IconChevronDown,
  IconChevronUp,
  IconDotsVertical,
  IconEdit,
  IconTrash,
  IconUser,
} from '@tabler/icons-react';
import { ColumnDef } from '@tanstack/react-table';
import { cva } from 'class-variance-authority';
import { useFormatter, useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from '../ui/button';
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

export const columns = (
  t: ReturnType<typeof useTranslations>,
  format: ReturnType<typeof useFormatter>
): ColumnDef<ProjectWithClient>[] => {
  return [
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <div
          className='flex items-center gap-1 cursor-pointer select-none'
          onClick={column.getToggleSortingHandler()}>
          {t('Common.project_name')}
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
          <div className='text-sm text-muted-foreground truncate max-w-80'>
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
          <span>{t('Common.status')}</span>
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
          {t(`Status.${info.getValue()}`)}
        </Badge>
      ),
      filterFn: 'equals',
    },
    {
      accessorKey: 'clients.name',
      header: t('Common.client'),
      cell: (info) => (
        <div className='flex items-center gap-1'>
          <IconUser className='h-4 w-4 text-muted-foreground' />
          <span>{info.getValue() as string}</span>
        </div>
      ),
    },
    {
      accessorKey: 'start_date',
      header: ({ column }) => (
        <div
          className='flex items-center gap-1 cursor-pointer select-none'
          onClick={column.getToggleSortingHandler()}>
          {t('Common.start_date')}
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
        <>
          {info.getValue() ? (
            <div className='flex items-center gap-1'>
              <IconCalendar className='h-4 w-4 text-muted-foreground' />
              <span>
                {format.dateTime(new Date(info.getValue() as string), {
                  year: '2-digit',
                  month: '2-digit',
                  day: '2-digit',
                })}
              </span>
            </div>
          ) : (
            <span className='text-muted-foreground'>-</span>
          )}
        </>
      ),
    },
    {
      accessorKey: 'end_date',
      header: ({ column }) => (
        <div
          className='flex items-center gap-1 cursor-pointer select-none'
          onClick={column.getToggleSortingHandler()}>
          {t('Common.end_date')}
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
        <>
          {info.getValue() ? (
            <div className='flex items-center gap-1'>
              <IconCalendar className='h-4 w-4 text-muted-foreground' />
              <span>
                {format.dateTime(new Date(info.getValue() as string), {
                  year: '2-digit',
                  month: '2-digit',
                  day: '2-digit',
                })}
              </span>
            </div>
          ) : (
            <span className='text-muted-foreground'>-</span>
          )}
        </>
      ),
    },
    {
      id: 'actions',
      cell: (info) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='ghost'
              className='data-[state=open]:bg-muted text-muted-foreground flex size-8'
              size='icon'>
              <IconDotsVertical />
              <span className='sr-only'>Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align='end'
            className='w-32'>
            <DropdownMenuLabel>{t('Common.actions')}</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link
                href={`/projects/${info.row.original.id}`}
                prefetch={false}>
                <IconEdit className='h-4 w-4' />
                {t('Common.view_details')}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant='destructive'>
              <IconTrash className='h-4 w-4' />
              {t('Common.delete')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];
};
