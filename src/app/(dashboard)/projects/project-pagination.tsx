import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProjectPaginationProps {
  total: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
}

export default function ProjectPagination({
  total,
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
}: ProjectPaginationProps) {
  if (totalPages <= 1) return null;
  const startIndex = (currentPage - 1) * itemsPerPage;
  return (
    <div className='flex items-center justify-between mt-6'>
      <p className='text-sm text-muted-foreground'>
        Showing {startIndex + 1} to {Math.min(startIndex + 5, total)} of {total} projects
      </p>
      <div className='flex items-center gap-2'>
        <Button
          variant='outline'
          size='sm'
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}>
          <ChevronLeft className='h-4 w-4' />
          Previous
        </Button>
        <div className='flex items-center gap-1'>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? 'default' : 'outline'}
              size='sm'
              onClick={() => onPageChange(page)}
              className='w-8 h-8 p-0'>
              {page}
            </Button>
          ))}
        </div>
        <Button
          variant='outline'
          size='sm'
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}>
          Next
          <ChevronRight className='h-4 w-4' />
        </Button>
      </div>
    </div>
  );
}
