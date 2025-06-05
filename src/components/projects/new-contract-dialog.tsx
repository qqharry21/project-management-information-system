'use client';
import { ActionDialog } from '@/components/action-dialog';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { useDialogStore } from '@/store/dialog-store';

export function NewContractDialog() {
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
