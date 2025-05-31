'use client';

import {
  IconCirclePlusFilled,
  IconClipboardData,
  IconEdit,
  IconFileText,
  IconFolder,
  IconMail,
  IconUser,
  type Icon,
} from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: Icon;
  }[];
}) {
  const pathname = usePathname();
  console.log('🚨 - pathname', pathname);
  return (
    <SidebarGroup>
      <SidebarGroupContent className='flex flex-col gap-2'>
        <SidebarMenu>
          <SidebarMenuItem className='flex items-center gap-2'>
            <DropdownMenu>
              <SidebarMenuButton
                tooltip='快速建立'
                className='bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear'
                asChild>
                <DropdownMenuTrigger>
                  <IconCirclePlusFilled />
                  <span>快速建立</span>
                </DropdownMenuTrigger>
              </SidebarMenuButton>
              <DropdownMenuContent
                className='w-full'
                align='end'>
                <DropdownMenuItem>
                  <IconFolder />
                  New Project
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <IconFileText />
                  New Contract
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <IconEdit />
                  Create Invoice
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <IconUser />
                  Add Client
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <IconClipboardData />
                  New Quotation
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              size='icon'
              className='size-8 group-data-[collapsible=icon]:opacity-0'
              variant='outline'>
              <IconMail />
              <span className='sr-only'>Inbox</span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                isActive={pathname.includes(item.url)}
                asChild>
                <Link href={item.url}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
