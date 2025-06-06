import { Button } from '@/components/ui/button';
import { Table as ReactTable } from '@tanstack/react-table';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ProjectWithClient } from './project-dashboard';

export default function ProjectPagination({ table }: { table: ReactTable<ProjectWithClient> }) {
  const t = useTranslations();
  const totalPages = table.getPageCount();
  const currentPage = table.getState().pagination.pageIndex;
  const itemsPerPage = table.getState().pagination.pageSize;
  const total = table.getTotalSize();
  const startIndex = currentPage * itemsPerPage;

  return (
    <div className='flex items-center justify-between'>
      <p className='text-sm text-muted-foreground'>
        {t('Common.pagination.showing', {
          startIndex: startIndex + 1,
          endIndex: Math.min(startIndex + itemsPerPage, total),
          total,
        })}
      </p>
      {totalPages > 1 && (
        <div className='flex items-center gap-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}>
            <ChevronLeft className='h-4 w-4' />
            {t('Common.pagination.previous')}
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
            {t('Common.pagination.next')}
            <ChevronRight className='h-4 w-4' />
          </Button>
        </div>
      )}
    </div>
  );
}
