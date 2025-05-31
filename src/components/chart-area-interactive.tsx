'use client';

import * as React from 'react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useIsMobile } from '@/hooks/use-mobile';

export const description = 'An interactive area chart';

const chartData = [
  { date: '2024-11', income: 180, expense: 400 },
  { date: '2024-12', income: 125, expense: 280 },
  { date: '2025-01', income: 385, expense: 320 },
  { date: '2025-02', income: 438, expense: 480 },
  { date: '2025-03', income: 236, expense: 278 },
  { date: '2025-04', income: 454, expense: 380 },
];

const chartConfig = {
  visitors: {
    label: 'Visitors',
  },
  income: {
    label: 'Income',
    color: 'var(--chart-1)',
  },
  expense: {
    label: 'Expense',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig;

export function ChartAreaInteractive() {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState('1y');

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange('3m');
    }
  }, [isMobile]);

  const filteredData = React.useMemo(() => {
    const today = new Date();
    const cutoffDates = {
      '1y': new Date(today.getFullYear(), 0),
      '6m': new Date(today.getFullYear(), today.getMonth() - 6),
      '3m': new Date(today.getFullYear(), today.getMonth() - 3),
    };

    const cutoffDate = cutoffDates[timeRange as keyof typeof cutoffDates];
    if (!cutoffDate) return [];

    return chartData.filter((item) => new Date(item.date) > cutoffDate);
    // Need to add chartData to dependency array
  }, [timeRange]);

  return (
    <Card className='@container/card col-span-full'>
      <CardHeader>
        <CardTitle>收入與支出趨勢</CardTitle>
        <CardDescription>
          <span className='hidden @[540px]/card:block'>統計至今日為止</span>
          <span className='@[540px]/card:hidden'>至今日為止</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type='single'
            value={timeRange}
            onValueChange={setTimeRange}
            variant='outline'
            className='hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex'>
            <ToggleGroupItem value='1y'>今年</ToggleGroupItem>
            <ToggleGroupItem value='6m'>6 個月前</ToggleGroupItem>
            <ToggleGroupItem value='3m'>3 個月前</ToggleGroupItem>
          </ToggleGroup>
          <Select
            value={timeRange}
            onValueChange={setTimeRange}>
            <SelectTrigger
              className='flex w-full md:w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden'
              size='sm'
              aria-label='Select a value'>
              <SelectValue placeholder='3 個月前' />
            </SelectTrigger>
            <SelectContent className='rounded-xl'>
              <SelectItem
                value='1y'
                className='rounded-lg'>
                今年
              </SelectItem>
              <SelectItem
                value='6m'
                className='rounded-lg'>
                6 個月前
              </SelectItem>
              <SelectItem
                value='3m'
                className='rounded-lg'>
                3 個月前
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className='px-2 pt-4 sm:px-6 sm:pt-6'>
        <ChartContainer
          config={chartConfig}
          className='aspect-auto h-[250px] w-full'>
          <AreaChart
            data={filteredData}
            accessibilityLayer
            margin={{
              left: 12,
              right: 12,
            }}>
            <defs>
              <linearGradient
                id='fillIncome'
                x1='0'
                y1='0'
                x2='0'
                y2='1'>
                <stop
                  offset='5%'
                  stopColor='var(--color-income)'
                  stopOpacity={1.0}
                />
                <stop
                  offset='95%'
                  stopColor='var(--color-income)'
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient
                id='fillExpense'
                x1='0'
                y1='0'
                x2='0'
                y2='1'>
                <stop
                  offset='5%'
                  stopColor='var(--color-expense)'
                  stopOpacity={0.8}
                />
                <stop
                  offset='95%'
                  stopColor='var(--color-expense)'
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='date'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('zh-TW', {
                  month: 'short',
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              defaultIndex={isMobile ? -1 : 10}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('zh-TW', {
                      month: 'short',
                      day: 'numeric',
                    });
                  }}
                  indicator='dot'
                />
              }
            />
            <Area
              dataKey='expense'
              type='natural'
              fill='url(#fillExpense)'
              stroke='var(--color-expense)'
              stackId='a'
            />
            <Area
              dataKey='income'
              type='natural'
              fill='url(#fillIncome)'
              stroke='var(--color-income)'
              stackId='a'
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
