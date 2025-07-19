"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { clsx } from "clsx";
import { useEffect } from "react";
import { popInMotionProps } from "@/motion/presets";
import { motion, AnimatePresence } from "framer-motion";

interface ModalMessageProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  message: string;
  title: string;
  status: "success" | "error" | "info" | "warning";
  autoClose?: boolean;
  duration?: number; // ms
}

export const ModalMessage = ({
  open,
  onOpenChange,
  message,
  title,
  status,
  autoClose = false,
  duration = 3000,
}: ModalMessageProps) => {
  useEffect(() => {
    if (open && autoClose) {
      const timer = setTimeout(() => {
        onOpenChange(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [open, autoClose, duration, onOpenChange]);
  const styleMap = {
    success: "bg-green-100 text-green-800",
    error: "bg-red-100 text-red-800",
    info: "bg-blue-100 text-blue-800",
    warning: "bg-yellow-100 text-yellow-800",
  };
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-fadeIn" />
            <Dialog.Content asChild forceMount>
              <motion.div
                key="modal-message"
                {...popInMotionProps}
                role="alertdialog"
                className={clsx(
                  "fixed left-1/2 top-20 w-[60vw] min-w-sm -translate-x-1/2 -translate-y-1/2 rounded-lg p-6 shadow-xl transition-all",
                  styleMap[status]
                )}>
                <Dialog.Title className="text-lg font-bold">
                  {title}
                </Dialog.Title>
                <Dialog.Description className="mt-2 text-sm">
                  {message}
                </Dialog.Description>
                <Dialog.Close asChild>
                  <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                    aria-label="Close">
                    <Cross2Icon />
                  </button>
                </Dialog.Close>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
};
