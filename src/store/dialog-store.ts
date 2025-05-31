import { create } from 'zustand';

/**
 * Types of actions that can be performed in dialogs
 */
export type DialogActionType =
  | 'newProject'
  | 'newContract'
  | 'createInvoice'
  | 'addClient'
  | 'newQuotation'
  | null;

/**
 * Interface for dialog data with unknown structure
 */
export type DialogData = Record<string, unknown>;

/**
 * Interface for the global dialog state
 */
interface DialogState {
  // State
  isOpen: boolean;
  currentAction: DialogActionType;
  dialogData: DialogData | null;

  // Actions
  openDialog: (action: DialogActionType, data?: DialogData) => void;
  closeDialog: () => void;
  updateDialogData: (data: DialogData) => void;
}

/**
 * Global store for managing dialog state
 * - isOpen: whether any dialog is currently open
 * - currentAction: the type of action dialog that is currently open
 * - dialogData: optional data to pass to the dialog (like prefilled form values)
 * - openDialog: opens a dialog with a specific action type
 * - closeDialog: closes the current dialog
 * - updateDialogData: updates the dialog data
 */
export const useDialogStore = create<DialogState>((set) => ({
  // Initial state
  isOpen: false,
  currentAction: null,
  dialogData: null,

  // Actions
  openDialog: (action, data = {}) =>
    set({
      isOpen: true,
      currentAction: action,
      dialogData: data,
    }),

  closeDialog: () =>
    set({
      isOpen: false,
      currentAction: null,
      dialogData: null,
    }),

  updateDialogData: (data) =>
    set((state) => ({
      dialogData: state.dialogData ? { ...state.dialogData, ...data } : data,
    })),
}));
