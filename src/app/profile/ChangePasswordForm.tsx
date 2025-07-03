"use client"

import { useState } from "react"
import { useChangePasswordMutation } from "@/hooks/useChangePasswordMutation"
import {Button} from "@/components/ui/Button"

const ChangePasswordForm = () => {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const { mutate, isPending } = useChangePasswordMutation()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      alert("Password baru dan konfirmasi tidak cocok.")
      return
    }

    mutate({ currentPassword, newPassword, confirmPassword })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[538px] flex flex-col gap-5 bg-white"
    >
      <div className="flex flex-col gap-1">
        <label className="block text-sm font-semibold text-neutral-950">
          Current Password
        </label>
        <input
          type="password"
          required
          value={currentPassword}
          placeholder="Enter current password"
          onChange={(e) => setCurrentPassword(e.target.value)}
           className="w-full px-4 py-2 border border-neutral-300 text-neutral-950 rounded-xl focus:outline-none focus:ring-primary-400"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="block text-sm font-semibold text-neutral-950">
          New Password
        </label>
        <input
          type="password"
          required
          value={newPassword}
          placeholder="Enter new password"
          onChange={(e) => setNewPassword(e.target.value)}
           className="w-full px-4 py-2 border border-neutral-300 text-neutral-950 rounded-xl focus:outline-none focus:ring-primary-400"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="block text-sm font-semibold text-neutral-950">
          Confirm New Password
        </label>
        <input
          type="password"
          required
          value={confirmPassword}
          placeholder="Enter confirm new password"
          onChange={(e) => setConfirmPassword(e.target.value)}
           className="w-full px-4 py-2 border border-neutral-300 text-neutral-950 rounded-xl focus:outline-none focus:ring-primary-400"
        />
      </div>

      <Button
        type="submit"
        text="Update Password"
        isLoading={isPending}
        fullWidth
        className="cursor-pointer h-[44px] bg-primary-300 hover:bg-primary-200"
      />
    </form>
  )
}

export default ChangePasswordForm
