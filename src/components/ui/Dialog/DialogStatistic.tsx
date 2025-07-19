"use client";

import * as Dialog from "@radix-ui/react-dialog";
import * as Tabs from "@radix-ui/react-tabs";
import { HeartIcon, ChatBubbleIcon, Cross2Icon } from "@radix-ui/react-icons";
import { popInMotionProps } from "@/motion/presets";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
interface DialogConfirmDeleteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  // onDelete?: () => void;
}

export const DialogStatistic = ({
  open,
  onOpenChange,
}: // onDelete,
DialogConfirmDeleteProps) => {
  // const handleDelete = async () => {
  //   if (!onDelete) return;

  //   try {
  //     await onDelete(); // eksekusi dari parent
  //     // toast.success("Post berhasil dihapus");
  //   } catch (error) {
  //     console.error("Gagal menghapus post:", error);
  //     // toast.error("Gagal menghapus post");
  //   } finally {
  //     onOpenChange(false); // tutup modal
  //   }
  // };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay className="fixed inset-0 bg-black/40 z-[60]" />

            <Dialog.Content asChild forceMount>
              <motion.div
                key="statistic-dialog"
                {...popInMotionProps}
                className="z-[61] fixed top-[5%] left-1/2 -translate-x-1/2 w-[345px] lg:w-[451px] rounded-2xl p-6 flex flex-col gap-5  bg-white shadow-lg">
                <div className="w-full min-h-[34px] flex justify-between items-center">
                  <Dialog.Title className="w-full text-xl font-bold leading-xl text-neutral-950">
                    Statistic
                  </Dialog.Title>
                  <Dialog.Close asChild>
                    <button className="h-6 w-6 text-neutral-600 hover:text-neutral-800">
                      <Cross2Icon className="h-6 w-6" />
                    </button>
                  </Dialog.Close>
                </div>

                <div className="text-neutral-600 font-regular text-md leading-md">
                  <Tabs.Root
                    defaultValue="likes"
                    className="w-full flex flex-col">
                    <Tabs.List className="flex w-full border-b border-neutral-300">
                      <Tabs.Trigger
                        value="likes"
                        className="w-full px-4 py-2 text-sm font-semibold border-b-2 flex items-center justify-center gap-2
              transition-colors text-neutral-500 border-transparent
              data-[state=active]:text-primary-300 data-[state=active]:border-primary-300">
                        <HeartIcon className="w-4 h-4" />
                        Likes
                      </Tabs.Trigger>

                      <Tabs.Trigger
                        value="comments"
                        className="w-full px-4 py-2 text-sm font-semibold border-b-2 flex items-center justify-center gap-2
              transition-colors text-neutral-500 border-transparent
              data-[state=active]:text-primary-300 data-[state=active]:border-primary-300">
                        <ChatBubbleIcon className="w-4 h-4" />
                        Comments
                      </Tabs.Trigger>
                    </Tabs.List>

                    {/* Likes Content */}
                    <Tabs.Content
                      value="likes"
                      className="pt-4 text-sm text-neutral-700 flex flex-col gap-5">
                      <span className="text-lg font-bold leading-lg">
                        Like (20)
                      </span>
                      <div className="flex flex-col gap-3 h-[356px]">
                        {[...Array(4)].map((_, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-3 pb-3 border-b border-neutral-300">
                            <div className="relative w-12 h-12 rounded-full overflow-hidden">
                              <Image
                                src="/user.png"
                                alt="Clarissa"
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex flex-col justify-center">
                              <span className="text-neutral-900 font-semibold text-sm leading-sm">
                                Clarissa
                              </span>
                              <span className="text-neutral-600 text-sm leading-sm">
                                Frontend Developer
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Tabs.Content>

                    {/* Comments Content */}
                    <Tabs.Content
                      value="comments"
                      className="pt-4 text-sm text-neutral-700 flex flex-col gap-5">
                      <span className="text-lg font-bold leading-lg">
                        Comment (20)
                      </span>
                      <div className="flex flex-col gap-2 pb-3 border-b border-neutral-300">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-full overflow-hidden">
                            <Image
                              src="/user.png"
                              alt="Clarissa"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex flex-col justify-center">
                            <span className="text-neutral-900 font-semibold text-sm leading-sm">
                              Clarissa
                            </span>
                            <span className="text-neutral-600 text-sm leading-sm">
                              27 Maret 2025
                            </span>
                          </div>
                        </div>
                        <span>
                          This is super insightful — thanks for sharing!
                        </span>
                      </div>
                    </Tabs.Content>
                  </Tabs.Root>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
};
