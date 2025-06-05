'use client';
import { ActionDialog } from '@/components/action-dialog';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { useDialogStore } from '@/store/dialog-store';

export function AddClientDialog() {
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
