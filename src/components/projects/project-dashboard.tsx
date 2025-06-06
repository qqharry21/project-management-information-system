'use client';

import { useIsMobile } from '@/hooks/use-mobile';
import { createClient } from '@/lib/supabase/client';
import { getProjects } from '@/queries/get-projects';
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';
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
import { useFormatter, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { columns } from './project-columns';
import ProjectFilters from './project-filters';
import ProjectList from './project-list';
import ProjectPagination from './project-pagination';
import ProjectStats from './project-stats';

export type ProjectWithClient = Tables<'projects'> & {
  clients?: { name: string };
};

export default function ProjectDashboard() {
  const supabase = createClient();
  const { data: projects, isLoading, isError } = useQuery(getProjects(supabase));

  const t = useTranslations();
  const format = useFormatter();
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState('');
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const table = useReactTable({
    data: projects || [],
    columns: columns(t, format),
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
    globalFilterFn: (row, _, filterValue) => {
      // Search in name, description, and client name
      const project = row.original;
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

  useEffect(() => {
    if (isMobile) {
      setViewMode('grid');
    }
  }, [isMobile]);

  if (isLoading) return <div>Loading...</div>;

  if (isError || !projects) return <div>Error</div>;

  if (projects.length === 0) return <div>No projects found</div>;

  return (
    <>
      <ProjectStats projects={projects} />
      <ProjectFilters
        table={table}
        setSearchTerm={setSearchTerm}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />
      <ProjectList
        viewMode={viewMode}
        table={table}
      />
      <ProjectPagination table={table} />
    </>
  );
}
