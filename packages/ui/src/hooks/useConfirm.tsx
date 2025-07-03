"use client";

import * as React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogClose,
} from "@ui/components/alertDialog";
import { Button } from "@ui/components/button";

interface ConfirmOptions {
  title: string;
  description: string;
  onConfirm?: (close: () => void) => void | Promise<void>;
  onCancel?: (close: () => void) => void;
}

interface ConfirmContextType {
  confirm: (options: ConfirmOptions) => void;
}

const ConfirmContext = React.createContext<ConfirmContextType | null>(null);

interface ConfirmState {
  isOpen: boolean;
  isLoading: boolean;
  title: string;
  description: string;
  onConfirm?: (close: () => void) => void | Promise<void>;
  onCancel?: (close: () => void) => void;
}

export function ConfirmProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<ConfirmState>({
    isOpen: false,
    isLoading: false,
    title: "",
    description: "",
  });

  const close = React.useCallback(() => {
    setState((prev) => ({
      ...prev,
      isOpen: false,
      isLoading: false,
    }));
  }, []);

  const confirm = React.useCallback((options: ConfirmOptions) => {
    setState({
      isOpen: true,
      isLoading: false,
      title: options.title,
      description: options.description,
      onConfirm: options.onConfirm,
      onCancel: options.onCancel,
    });
  }, []);

  const handleConfirm = React.useCallback(async () => {
    if (!state.onConfirm) {
      close();
      return;
    }

    setState((prev) => ({ ...prev, isLoading: true }));

    try {
      await state.onConfirm(close);
    } catch (error) {
      setState((prev) => ({ ...prev, isLoading: false }));
      // 如果确认操作失败，可以在这里处理错误，比如显示错误消息
      console.error("确认操作失败:", error);
    }
  }, [state.onConfirm, close]);

  const handleCancel = React.useCallback(() => {
    if (state.onCancel) {
      state.onCancel(close);
    } else {
      close();
    }
  }, [state.onCancel, close]);

  const contextValue = React.useMemo(
    () => ({
      confirm,
    }),
    [confirm],
  );

  return (
    <ConfirmContext.Provider value={contextValue}>
      {children}
      <AlertDialog
        open={state.isOpen}
        onOpenChange={(open) => !open && handleCancel()}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{state.title}</AlertDialogTitle>
            <AlertDialogDescription>{state.description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogClose disabled={state.isLoading} onClick={handleCancel}>
              取消
            </AlertDialogClose>
            <Button
              variant="destructive"
              onClick={handleConfirm}
              disabled={state.isLoading}
            >
              {state.isLoading ? "处理中..." : "确定"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ConfirmContext.Provider>
  );
}

export function useConfirm() {
  const context = React.useContext(ConfirmContext);

  if (!context) {
    throw new Error("useConfirm must be used within a ConfirmProvider");
  }

  return context.confirm;
}
