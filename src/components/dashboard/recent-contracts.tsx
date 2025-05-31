'use client';

import { IconArrowUpRight, IconCircleCheckFilled, IconLoader } from '@tabler/icons-react';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import Link from 'next/link';
import { z } from 'zod';

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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export const schema = z.object({
  id: z.number(),
  header: z.string(),
  type: z.string(),
  status: z.string(),
  value: z.number(),
  limit: z.string(),
  reviewer: z.string(),
  date: z.string(),
});

const columns: ColumnDef<z.infer<typeof schema>>[] = [
  {
    accessorKey: 'client',
    header: '客戶名稱',
    cell: ({ row }) => {
      // TODO: 顯示 client 的 name
      return <div>{row.original.header}</div>;
    },
    enableHiding: false,
  },
  {
    accessorKey: 'status',
    header: '狀態',
    cell: ({ row }) => (
      <Badge
        variant='outline'
        className='text-muted-foreground px-1.5'>
        {row.original.status === 'Done' ? (
          <IconCircleCheckFilled className='fill-green-500 dark:fill-green-400' />
        ) : (
          <IconLoader />
        )}
        {row.original.status === 'Done' ? '已完成' : '進行中'}
      </Badge>
    ),
  },
  {
    accessorKey: 'date',
    header: '日期',
    cell: ({ row }) =>
      new Date(row.original.date).toLocaleDateString('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
  },
  {
    accessorKey: 'value',
    header: () => <div className='w-full text-right'>金額</div>,
    cell: ({ row }) => (
      <div className='w-full text-right'>
        {row.original.value.toLocaleString('zh-TW', {
          style: 'currency',
          currency: 'TWD',
          minimumFractionDigits: 0,
        })}
      </div>
    ),
  },
];

export const RecentContracts = ({ data: initialData }: { data: z.infer<typeof schema>[] }) => {
  const table = useReactTable({
    data: initialData.slice(0, 5),
    columns,
    getRowId: (row) => row.id.toString(),
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>最近合約</CardTitle>
        <CardDescription>查看最近 5 筆</CardDescription>
        <CardAction>
          <Button
            variant='outline'
            size='sm'
            asChild>
            <Link href='/contracts'>
              查看更多
              <IconArrowUpRight className='h-4 w-4' />
            </Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className='overflow-hidden rounded-lg border'>
          <Table>
            <TableHeader className='bg-muted sticky top-0 z-10'>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        colSpan={header.colSpan}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className='**:data-[slot=table-cell]:first:w-8'>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className='h-24 text-center'>
                    最近沒有合約
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
