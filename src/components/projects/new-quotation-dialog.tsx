'use client';
import { ActionDialog } from '@/components/action-dialog';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { useDialogStore } from '@/store/dialog-store';

export function NewQuotationDialog() {
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
