"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { popInMotionProps } from "@/motion/presets";
interface DialogEditProfileProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  avatarUrl?: string;
  name?: string ;
  headline?: string;
  onSubmit?: () => void;
}

export const DialogEditProfile = ({
  open,
  onOpenChange,
  avatarUrl = "/user.png",
  name = "",
  headline = "",
  onSubmit,
}: DialogEditProfileProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay className="fixed inset-0 bg-black/40 z-[60]" />

            <Dialog.Content asChild forceMount>
              <motion.div
                {...popInMotionProps}
                className="z-[61] fixed top-[5%] left-1/2 -translate-x-1/2 w-[345px] h-[438px] lg:w-[451px] lg:h-[446px] rounded-2xl p-6 flex flex-col gap-5 bg-white  shadow-xl">
                <form
                  className="flex flex-col gap-5 h-full"
                  onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit?.();
                  }}>
                  <div className="w-full min-h-[34px] flex justify-between items-center">
                    <Dialog.Title className="text-xl font-bold leading-xl text-neutral-950">
                      Edit Profile
                    </Dialog.Title>
                    <Dialog.Close asChild>
                      <button className="h-6 w-6 text-neutral-600 hover:text-neutral-800">
                        <Cross2Icon className="h-6 w-6" />
                      </button>
                    </Dialog.Close>
                  </div>

                  <div className="flex flex-col gap-5 items-center justify-center flex-grow">
                    <div className="relative h-20 w-20 rounded-full">
                      <Image
                        src={avatarUrl}
                        alt="avatar"
                        width={80}
                        height={80}
                        className="object-cover rounded-full border"
                      />
                      <div className="absolute bg-primary-300 rounded-full h-6 w-6 flex items-center justify-center bottom-0 right-0">
                        <Image
                          src="/icons/icon-camera.svg"
                          alt="camera"
                          width={14.4}
                          height={14.4}
                          className="object-cover"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1 w-full">
                      <label className="block text-sm font-semibold text-neutral-950">
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={() => {}}
                        className="w-full px-4 py-2 border border-neutral-300 text-neutral-950 rounded-xl focus:outline-none focus:ring-primary-400"
                      />
                    </div>

                    <div className="flex flex-col gap-1 w-full">
                      <label className="block text-sm font-semibold text-neutral-950">
                        Profile Headline
                      </label>
                      <input
                        type="text"
                        required
                        value={headline}
                        onChange={() => {}}
                        className="w-full px-4 py-2 border border-neutral-300 text-neutral-950 rounded-xl focus:outline-none focus:ring-primary-400"
                      />
                    </div>

                    <Button
                      type="submit"
                      text="Update Password"
                      fullWidth
                      className="cursor-pointer h-[44px] bg-primary-300 hover:bg-primary-200"
                    />
                  </div>
                </form>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
};
