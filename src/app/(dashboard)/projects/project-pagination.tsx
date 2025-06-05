import { Button } from '@/components/ui/button';
import { Table as ReactTable } from '@tanstack/react-table';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProjectWithClient } from './project-dashboard';

export default function ProjectPagination({ table }: { table: ReactTable<ProjectWithClient> }) {
  const totalPages = table.getPageCount();
  const currentPage = table.getState().pagination.pageIndex;
  const itemsPerPage = table.getState().pagination.pageSize;
  const total = table.getRowModel().rows.length;
  const startIndex = (currentPage - 1) * itemsPerPage;

  if (totalPages <= 1) return null;

  return (
    <div className='flex items-center justify-between mt-6'>
      <p className='text-sm text-muted-foreground'>
        Showing {startIndex + 1} to {Math.min(startIndex + 5, total)} of {total} projects
      </p>
      <div className='flex items-center gap-2'>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}>
          <ChevronLeft className='h-4 w-4' />
          Previous
        </Button>
        <div className='flex items-center gap-1'>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? 'default' : 'outline'}
              size='sm'
              onClick={() => table.setPageIndex(page)}
              className='w-8 h-8 p-0'>
              {page}
            </Button>
          ))}
        </div>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}>
          Next
          <ChevronRight className='h-4 w-4' />
        </Button>
      </div>
    </div>
  );
}
