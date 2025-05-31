'use client';

import {
  IconCirclePlusFilled,
  IconClipboardData,
  IconEdit,
  IconFileText,
  IconFolder,
  IconUser,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DialogActionType, useDialogStore } from '@/store/dialog-store';

interface QuickActionsProps {
  align?: 'start' | 'center' | 'end';
  className?: string;
}

export function QuickActions({ align = 'end', className = '' }: QuickActionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { openDialog } = useDialogStore();

  const handleAction = (action: DialogActionType) => {
    console.log('🚨 - action', action);
    openDialog(action);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      console.log('🚨 - event', event);
      if (event.metaKey && event.key === 'k') {
        event.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (event.ctrlKey && event.key === '1') {
        event.preventDefault();
        handleAction('newProject');
      }
      if (event.ctrlKey && event.key === '2') {
        event.preventDefault();
        handleAction('newContract');
      }
      if (event.ctrlKey && event.key === '3') {
        event.preventDefault();
        handleAction('createInvoice');
      }
      if (event.ctrlKey && event.key === '4') {
        event.preventDefault();
        handleAction('addClient');
      }
      if (event.ctrlKey && event.key === '5') {
        event.preventDefault();
        handleAction('newQuotation');
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <DropdownMenu
      open={isOpen}
      onOpenChange={setIsOpen}>
      <DropdownMenuTrigger className={className}>
        <IconCirclePlusFilled />
        快速建立
        <span className='ml-auto bg-secondary/10 text-secondary text-xs tracking-widest px-2 py-px rounded-sm'>
          ⌘ K
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-56'
        align={align}>
        <DropdownMenuItem onClick={() => handleAction('newProject')}>
          <IconFolder className='mr-2 h-4 w-4' />
          新增專案
          <DropdownMenuShortcut>⌃ + 1</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleAction('newContract')}>
          <IconFileText className='mr-2 h-4 w-4' />
          建立新合約
          <DropdownMenuShortcut>⌃ + 2</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleAction('createInvoice')}>
          <IconEdit className='mr-2 h-4 w-4' />
          開立新發票
          <DropdownMenuShortcut>⌃ + 3</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleAction('addClient')}>
          <IconUser className='mr-2 h-4 w-4' />
          新增客戶
          <DropdownMenuShortcut>⌃ + 4</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleAction('newQuotation')}>
          <IconClipboardData className='mr-2 h-4 w-4' />
          建立報價單
          <DropdownMenuShortcut>⌃ + 5</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
