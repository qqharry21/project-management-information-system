'use client';

import { AddClientDialog } from '@/components/projects/add-client-dialog';
import { CreateInvoiceDialog } from '@/components/projects/create-invoice-dialog';
import { NewContractDialog } from '@/components/projects/new-contract-dialog';
import { NewProjectDialog } from '@/components/projects/new-project-dialog';
import { NewQuotationDialog } from '@/components/projects/new-quotation-dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { DialogActionType, useDialogStore } from '@/store/dialog-store';
import * as React from 'react';

interface ActionDialogProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

/**
 * Component mapping for different dialog actions
 */
const DialogComponents: Record<Exclude<DialogActionType, null>, React.FC> = {
  newProject: () => <NewProjectDialog />,
  newContract: () => <NewContractDialog />,
  createInvoice: () => <CreateInvoiceDialog />,
  addClient: () => <AddClientDialog />,
  newQuotation: () => <NewQuotationDialog />,
};

/**
 * Global action dialog that renders different content based on the current action
 */
export function GlobalActionDialog() {
  const { isOpen, currentAction } = useDialogStore();

  if (!currentAction || !isOpen) return null;

  const DialogComponent = DialogComponents[currentAction];

  if (!DialogComponent) return null;

  return <DialogComponent />;
}

/**
 * Base dialog component that wraps content with standard dialog UI
 */
export function ActionDialog({ title, description, children, maxWidth = 'md' }: ActionDialogProps) {
  const { isOpen, closeDialog } = useDialogStore();

  const maxWidthClass = {
    sm: 'sm:max-w-sm',
    md: 'sm:max-w-md',
    lg: 'sm:max-w-lg',
    xl: 'sm:max-w-xl',
    '2xl': 'sm:max-w-2xl',
  }[maxWidth];

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open: boolean) => !open && closeDialog()}>
      <DialogContent className={`${maxWidthClass} overflow-y-auto max-h-[90vh]`}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        {children}
      </DialogContent>
    </Dialog>
  );
}
