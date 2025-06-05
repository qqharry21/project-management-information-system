"use client";

import {
  IconCirclePlusFilled,
  IconClipboardData,
  IconEdit,
  IconFileText,
  IconFolder,
  IconUser,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DialogActionType, useDialogStore } from "@/store/dialog-store";

interface QuickActionsProps {
  className?: string;
}

// Key bindings for quick actions
const QUICK_ACTION_KEY_MAP: Record<string, DialogActionType> = {
  "ctrl+1": "newProject",
  "ctrl+2": "newContract",
  "ctrl+3": "createInvoice",
  "ctrl+4": "addClient",
  "ctrl+5": "newQuotation",
};

export function QuickActions({ className = "" }: QuickActionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { openDialog } = useDialogStore();

  const handleAction = (action: DialogActionType) => {
    openDialog(action);
  };

  useEffect(() => {
    /**
     * Handles global keyboard shortcuts for quick actions.
     * - ⌘+K toggles the quick actions menu.
     * - Ctrl+1~5 trigger specific dialogs.
     */
    function handleKeyDown(event: KeyboardEvent) {
      // Toggle quick actions menu
      if (event.metaKey && event.key === "k") {
        event.preventDefault();
        setIsOpen((prev) => !prev);
        return;
      }

      // Build key string for lookup
      const keyCombo = [event.ctrlKey ? "ctrl" : "", event.key]
        .filter(Boolean)
        .join("+");
      const action = QUICK_ACTION_KEY_MAP[keyCombo];
      if (action) {
        event.preventDefault();
        handleAction(action);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger className={className}>
        <IconCirclePlusFilled />
        快速建立
        <span className="ml-auto bg-secondary/10 text-secondary text-xs tracking-widest px-2 py-px rounded-sm">
          ⌘ K
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-54" align="end">
        <DropdownMenuItem onClick={() => handleAction("newProject")}>
          <IconFolder className="mr-2 h-4 w-4" />
          新增專案
          <DropdownMenuShortcut>⌃ 1</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleAction("newContract")}>
          <IconFileText className="mr-2 h-4 w-4" />
          建立新合約
          <DropdownMenuShortcut>⌃ 2</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleAction("createInvoice")}>
          <IconEdit className="mr-2 h-4 w-4" />
          開立新發票
          <DropdownMenuShortcut>⌃ 3</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleAction("addClient")}>
          <IconUser className="mr-2 h-4 w-4" />
          新增客戶
          <DropdownMenuShortcut>⌃ 4</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleAction("newQuotation")}>
          <IconClipboardData className="mr-2 h-4 w-4" />
          建立報價單
          <DropdownMenuShortcut>⌃ 5</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
