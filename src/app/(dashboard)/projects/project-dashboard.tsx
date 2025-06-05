'use client';

import type { Tables } from '@supabase/types';
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';
import { columns } from './project-columns';
import ProjectFilters from './project-filters';
import ProjectList from './project-list';
import ProjectPagination from './project-pagination';
import ProjectStats from './project-stats';

export type ProjectWithClient = Tables<'projects'> & { clients?: { name: string } };

interface ProjectDashboardProps {
  projects: ProjectWithClient[];
}

export default function ProjectDashboard({ projects }: ProjectDashboardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data: projects,
    columns,
    state: {
      sorting,
      globalFilter: searchTerm,
      pagination,
      columnFilters,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
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

  // 取得目前 status filter 狀態
  const statusFilter = String(columnFilters.find((f) => f.id === 'status')?.value ?? 'all');
  const setStatusFilter = (value: string) => {
    setColumnFilters((prev) => {
      // 移除 status filter
      if (value === 'all') {
        return prev.filter((f) => f.id !== 'status');
      }
      // 設定 status filter
      const otherFilters = prev.filter((f) => f.id !== 'status');
      return [...otherFilters, { id: 'status', value }];
    });
  };

  return (
    <>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>專案管理</h1>
          <p className='text-muted-foreground'>在這裡管理並追蹤所有專案</p>
        </div>
      </div>
      <ProjectStats projects={projects} />
      <ProjectFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        viewMode={viewMode}
        setViewMode={setViewMode}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
      <ProjectList
        viewMode={viewMode}
        table={table}
      />
      <ProjectPagination table={table} />
    </>
  );
}
