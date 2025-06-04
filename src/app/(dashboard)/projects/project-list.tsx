'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ColumnDef, flexRender, Table as ReactTable } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import type { ProjectWithClient } from './project-dashboard';

const statusColors = {
  active: 'bg-green-100 text-green-800',
  completed: 'bg-blue-100 text-blue-800',
  on_hold: 'bg-yellow-100 text-yellow-800',
  planning: 'bg-gray-100 text-gray-800',
  cancelled: 'bg-red-100 text-red-800',
};

interface ProjectListProps {
  projects: ProjectWithClient[];
  viewMode: 'table' | 'grid';
  columns: ColumnDef<ProjectWithClient>[];
  table: ReactTable<ProjectWithClient>;
}

export default function ProjectList({ projects, viewMode, columns, table }: ProjectListProps) {
  if (viewMode === 'table') {
    return (
      <Card className='p-0'>
        <CardContent className='p-0'>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className='text-center text-muted-foreground'>
                    找不到專案。
                  </TableCell>
                </TableRow>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }

  // Grid view (unchanged)
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {projects.map((project) => (
        <Card
          key={project.id}
          className='hover:shadow-md transition-shadow'>
          <CardHeader>
            <div className='flex items-start justify-between'>
              <div className='space-y-1'>
                <CardTitle className='text-lg'>{project.name}</CardTitle>
                <CardDescription>{project.clients?.name}</CardDescription>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant='ghost'
                    className='h-8 w-8 p-0'>
                    <MoreHorizontal className='h-4 w-4' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  <DropdownMenuLabel>動作</DropdownMenuLabel>
                  <DropdownMenuItem>檢視詳情</DropdownMenuItem>
                  <DropdownMenuItem>編輯專案</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className='text-destructive'>刪除專案</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className='space-y-4'>
            <p className='text-sm text-muted-foreground'>{project.description}</p>
            <div className='flex items-center gap-2'>
              <Badge className={statusColors[project.status as keyof typeof statusColors] || ''}>
                {project.status}
              </Badge>
            </div>
            <div className='flex items-center justify-between text-sm'>
              <span className='text-muted-foreground'>開始日期</span>
              <span className='font-medium'>
                {project.start_date
                  ? new Date(project.start_date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })
                  : '-'}
              </span>
            </div>
            <div className='flex items-center justify-between text-sm'>
              <span className='text-muted-foreground'>結束日期</span>
              <span>
                {project.end_date
                  ? new Date(project.end_date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })
                  : '-'}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
      {projects.length === 0 && (
        <div className='col-span-full text-center text-muted-foreground'>找不到專案。</div>
      )}
    </div>
  );
}
