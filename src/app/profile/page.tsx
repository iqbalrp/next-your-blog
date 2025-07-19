"use client";
import Image from "next/image";
import { useState } from "react";
import { useUser } from "@/hooks/useUser";
import { DialogEditProfile } from "@/components/ui/Dialog/DialogEditProfile";
import ProfileTabs from "./ProfileTabs";
import { Button } from "@/components/ui/Button";
const ProfilePage = () => {
  const { data: user, isLoading, isError } = useUser();
  const [open, setOpen] = useState(false);

  if (isLoading) return <p className="p-6">Loading profile...</p>;
  if (isError || !user)
    return <p className="p-6 text-red-500">Failed to load profile.</p>;

  return (
    <section className="flex flex-col justify-center items-center">
      <div className="w-[800px]  flex flex-col pt-[128px]   gap-5">
        <div className=" flex justify-between items-center w-[800px] px-6 py-4  bg-white rounded-xl border border-neutral-300">
          <div className="flex items-center gap-4">
            <Image
              src={user.avatarUrl || "/user.png"}
              alt="avatar"
              width={80}
              height={80}
              className="object-cover rounded-full border"
            />
            <div>
              <h1 className="text-xl font-bold text-neutral-900">
                {user.name}
              </h1>
              {user.headline && (
                <p className="text-sm text-neutral-600">{user.headline}</p>
              )}
              <p className="text-sm text-neutral-500">{user.email}</p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            type="button"
            text="Edit Profile"
            fullWidth={false}
            variant="ghost"
            className="hover:bg-transparent cursor-pointer"
            textClassName="pr-4 text-primary-300 font-semibold text-sm leading-sm space-x-sm tracking-display-2xl underline"
          />
          <DialogEditProfile
                  open={open}
                  onOpenChange={setOpen}
                  avatarUrl={user.avatarUrl || "/user.png"}
                  name= {user?.name ?? ""}
                  headline= {user?.headline ?? ""}
                  onSubmit={() => console.log("Update profile")}
                />
        </div>
        <ProfileTabs />
      </div>
    </section>
  );
};

export default ProfilePage;
