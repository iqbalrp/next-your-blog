"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { clsx } from "clsx";
import { motion, AnimatePresence } from "framer-motion";

interface RadixAlertProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  message: string;
  type?: "success" | "error" | "info" | "warning";
}

export const DialogAlert = ({
  open,
  onOpenChange,
  message,
  type = "info",
}: RadixAlertProps) => {
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
          <Dialog.Portal forceMount>
            <Dialog.Overlay className="z-[61] fixed inset-0 bg-black/40" />

            <Dialog.Content asChild forceMount>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={clsx(
                  "z-[62] fixed top-[5%] left-1/2 -translate-x-1/2 w-[90vw] min-w-sm rounded-md p-4 shadow-md",
                  styleMap[type]
                )}
              >
                <Dialog.Title className="mb-6">Alert</Dialog.Title>
                <Dialog.Description className="text-sm font-medium">
                  {message}
                </Dialog.Description>
                <Dialog.Close asChild>
                  <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    aria-label="Close"
                  >
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
