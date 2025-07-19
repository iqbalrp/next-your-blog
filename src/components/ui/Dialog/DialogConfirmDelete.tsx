"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/Button"; // pastikan path ini sesuai
import { popInMotionProps } from "@/motion/presets";
import { motion, AnimatePresence } from "framer-motion";
interface DialogConfirmDeleteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete?: () => void;
}

export const DialogConfirmDelete = ({
  open,
  onOpenChange,
  onDelete,
}: DialogConfirmDeleteProps) => {
  const handleDelete = async () => {
    if (!onDelete) return;

    try {
      await onDelete(); // eksekusi dari parent
      // toast.success("Post berhasil dihapus");
    } catch (error) {
      console.error("Gagal menghapus post:", error);
      // toast.error("Gagal menghapus post");
    } finally {
      onOpenChange(false); // tutup modal
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay className="fixed inset-0 bg-black/40 z-[60]" />

            <Dialog.Content asChild forceMount>
              <motion.div
                {...popInMotionProps}
                className="z-[61] fixed top-[5%] left-1/2 -translate-x-1/2 w-[345px] lg:w-[451px] rounded-2xl p-6 flex flex-col gap-5  bg-white shadow-lg">
                <div className="w-full min-h-[34px] flex justify-between items-center">
                  <Dialog.Title className="w-full text-xl font-bold leading-xl text-neutral-950">
                    Delete
                  </Dialog.Title>
                  <Dialog.Close asChild>
                    <button className="h-6 w-6 text-neutral-600 hover:text-neutral-800">
                      <Cross2Icon className="h-6 w-6" />
                    </button>
                  </Dialog.Close>
                </div>

                <Dialog.Description className="text-neutral-600 font-regular text-md leading-md">
                  Are you sure to delete?
                </Dialog.Description>

                <div className="w-full h-12 flex justify-end gap-4">
                  <Dialog.Close asChild>
                    <Button
                      text="Cancel"
                      type="button"
                      fullWidth={false}
                      variant="ghost"
                      textClassName="text-neutral-950"
                      className="hover:bg-transparent cursor-pointer"
                    />
                  </Dialog.Close>

                  <Button
                    text="Delete"
                    type="button"
                    fullWidth={false}
                    onClick={handleDelete}
                    className="bg-red-500 w-[171px] hover:bg-red-400 cursor-pointer"
                  />
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
};
