'use client';
import { ActionDialog } from '@/components/action-dialog';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { useDialogStore } from '@/store/dialog-store';

export function CreateInvoiceDialog() {
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
