'use client';
import { useProjectDashboardStore } from '@/store/project-dashboard-store';
import type { Tables } from '@supabase/types';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';
import ProjectFilters from './project-filters';
import ProjectList from './project-list';
import ProjectPagination from './project-pagination';
import ProjectStats from './project-stats';

export type ProjectWithClient = Tables<'projects'> & { clients?: { name: string } };

const columns: ColumnDef<ProjectWithClient>[] = [
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
        {'狀態'}
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
    cell: (info) => <span>{info.getValue() as string}</span>,
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

interface ProjectDashboardProps {
  projects: ProjectWithClient[];
}

export default function ProjectDashboard({ projects }: ProjectDashboardProps) {
  const { searchTerm, statusFilter, viewMode, currentPage, setCurrentPage } =
    useProjectDashboardStore();
  const [sorting, setSorting] = useState<SortingState>([]);

  const itemsPerPage = 10;

  const table = useReactTable({
    data: projects,
    columns,
    state: {
      sorting,
      globalFilter: searchTerm,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: (row, columnId, filterValue) => {
      // Search in name, description, and client name
      const project = row.original as ProjectWithClient;
      const search = (filterValue as string).toLowerCase();
      return (
        (project.name?.toLowerCase() || '').includes(search) ||
        (project.description?.toLowerCase() || '').includes(search) ||
        (project.clients?.name?.toLowerCase() || '').includes(search)
      );
    },
    manualPagination: false,
    manualFiltering: false,
    manualSorting: false,
  });

  const filteredRows = table.getFilteredRowModel().rows.filter((row) => {
    if (statusFilter === 'all') return true;
    return row.original.status === statusFilter;
  });

  const totalPages = Math.ceil(filteredRows.length / itemsPerPage);
  const paginatedRows = filteredRows.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const paginatedProjects = paginatedRows.map((row) => row.original);

  return (
    <>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>專案管理</h1>
          <p className='text-muted-foreground'>在這裡管理並追蹤所有專案</p>
        </div>
      </div>
      <ProjectStats projects={projects} />
      <ProjectFilters />
      <ProjectList
        projects={paginatedProjects}
        viewMode={viewMode}
        columns={columns}
        table={table}
      />
      <ProjectPagination
        itemsPerPage={itemsPerPage}
        total={filteredRows.length}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
}
