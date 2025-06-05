"use client";

import { GlobalActionDialog } from "@/components/action-dialog";

/**
 * Dialog Provider Component
 *
 * This component should be added to the app layout to ensure that
 * dialogs can be triggered from anywhere in the application.
 */
export function DialogProvider() {
  return <GlobalActionDialog />;
}
