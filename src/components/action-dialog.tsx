'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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

/**
 * New Project Dialog Component
 */
function NewProjectDialog() {
  return (
    <ActionDialog
      title='Create New Project'
      description='Fill in the details to create a new project.'>
      {/* Project form fields will go here */}
      <div className='space-y-4'>
        <p>Project form content will go here</p>
      </div>

      <DialogFooter className='mt-6'>
        <Button
          variant='outline'
          onClick={() => useDialogStore.getState().closeDialog()}>
          Cancel
        </Button>
        <Button>Create Project</Button>
      </DialogFooter>
    </ActionDialog>
  );
}

/**
 * New Contract Dialog Component
 */
function NewContractDialog() {
  return (
    <ActionDialog
      title='New Contract'
      description='Create a new contract for a client or project.'>
      {/* Contract form fields will go here */}
      <div className='space-y-4'>
        <p>Contract form content will go here</p>
      </div>

      <DialogFooter className='mt-6'>
        <Button
          variant='outline'
          onClick={() => useDialogStore.getState().closeDialog()}>
          Cancel
        </Button>
        <Button>Create Contract</Button>
      </DialogFooter>
    </ActionDialog>
  );
}

/**
 * Create Invoice Dialog Component
 */
function CreateInvoiceDialog() {
  return (
    <ActionDialog
      title='Create Invoice'
      description='Generate a new invoice for a client or project.'>
      {/* Invoice form fields will go here */}
      <div className='space-y-4'>
        <p>Invoice form content will go here</p>
      </div>

      <DialogFooter className='mt-6'>
        <Button
          variant='outline'
          onClick={() => useDialogStore.getState().closeDialog()}>
          Cancel
        </Button>
        <Button>Generate Invoice</Button>
      </DialogFooter>
    </ActionDialog>
  );
}

/**
 * Add Client Dialog Component
 */
function AddClientDialog() {
  return (
    <ActionDialog
      title='Add Client'
      description='Add a new client to your system.'>
      {/* Client form fields will go here */}
      <div className='space-y-4'>
        <p>Client form content will go here</p>
      </div>

      <DialogFooter className='mt-6'>
        <Button
          variant='outline'
          onClick={() => useDialogStore.getState().closeDialog()}>
          Cancel
        </Button>
        <Button>Add Client</Button>
      </DialogFooter>
    </ActionDialog>
  );
}

/**
 * New Quotation Dialog Component
 */
function NewQuotationDialog() {
  return (
    <ActionDialog
      title='New Quotation'
      description='Create a new quotation for a client.'>
      {/* Quotation form fields will go here */}
      <div className='space-y-4'>
        <p>Quotation form content will go here</p>
      </div>

      <DialogFooter className='mt-6'>
        <Button
          variant='outline'
          onClick={() => useDialogStore.getState().closeDialog()}>
          Cancel
        </Button>
        <Button>Create Quotation</Button>
      </DialogFooter>
    </ActionDialog>
  );
}
