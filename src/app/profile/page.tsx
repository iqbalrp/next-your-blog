// app/profile/page.tsx
"use client";

import { useUser } from "@/hooks/useUser";
import Link from "next/link";
import ProfileTabs from "./ProfileTabs";
const ProfilePage = () => {
  const { data: user, isLoading, isError } = useUser();

  if (isLoading) return <p className="p-6">Loading profile...</p>;
  if (isError || !user)
    return <p className="p-6 text-red-500">Failed to load profile.</p>;

  return (
    <section className="flex flex-col justify-center items-center">
      <div className="w-[800px]  flex flex-col pt-[128px]   gap-5">
        <div className=" flex justify-between items-center w-[800px] px-6 py-4  bg-white rounded-xl border border-neutral-300">
          <div className="flex items-center gap-4">
            <img
              src={user.avatarUrl || "/user.png"}
              alt="avatar"
              className="w-20 h-20 object-cover rounded-full border"
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
          <Link
            href="/login"
            className="pr-4 text-primary-300 font-semibold text-sm leading-sm space-x-sm tracking-display-2xl underline">
            Edit Profile
          </Link>
        </div>
        <ProfileTabs />
      </div>
    </section>
  );
};

export default ProfilePage;
