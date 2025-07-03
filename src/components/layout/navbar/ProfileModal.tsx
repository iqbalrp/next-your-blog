"use client";

import { useAuth } from "@/context/AuthContext";
import { useUser } from "@/hooks/useUser";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

const ProfileModal = () => {
  const { logout } = useAuth();
  const { data: user } = useUser();
  const [open, setOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={modalRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 cursor-pointer justify-center">
        <img
          src={user?.avatarUrl || "/user.png"}
          alt="avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
        <span className="text-sm font-medium text-neutral-900">
          {user?.name}
        </span>
      </button>

      {open && (
        <div className="absolute -left-4 mt-2 w-[182px] text-sm bg-white rounded-xl border border-neutral-300 z-50">
          <Link
            href="/profile"
            className="cursor-pointer w-full h-11 text-left px-4 py-2 text-sm text-neutral-950  font-normal flex items-center gap-2 hover:bg-primary-100  rounded-t-xl">
            <img
              src="/icons/icon-user.svg"
              alt="logout"
              className="w-5 h-5  object-cover"
            />
            Profile
          </Link>

          <button
            onClick={logout}
            className="cursor-pointer w-full h-11 text-left px-4 py-2 text-sm text-neutral-950  font-normal flex items-center gap-2 hover:bg-primary-100  rounded-b-xl">
            <img
              src="/icons/icon-logout.svg"
              alt="logout"
              className="w-5 h-5  object-cover"
            />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileModal;
