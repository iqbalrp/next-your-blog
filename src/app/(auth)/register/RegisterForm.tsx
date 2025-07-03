"use client";
import { useRegistrationMutation } from "@/hooks/useRegistrationMutation";
import Link from "next/link";
import { useState } from "react";
import { Button

 } from "@/components/ui/Button";
export default function RegisterForm() {

    const { mutate, isPending } = useRegistrationMutation() 

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()

  if (password !== confirmPassword) {
    alert("Password dan konfirmasi password tidak cocok.")
    return
  }

  mutate({ name, email, password })
}

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[345px] md:w-[360px] bg-white flex flex-col gap-[20px] p-6 rounded-xl shadow-[0_0_24px_0_#CDCCCC29] border border-neutral-200">
      <h2 className="text-xl font-bold leading-xl space-x-xl tracking-display-2xl text-neutral-900">
        Create Account
      </h2>

      {/* Name */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="name"
          className="block text-sm font-semibold text-neutral-950">
          Name
        </label>
        <input
          id="name"
          type="text"
          required
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border border-neutral-300 text-neutral-950 rounded-xl focus:outline-none focus:ring-primary-400"
        />
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-neutral-950">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-neutral-300 text-neutral-950 rounded-xl focus:outline-none focus:ring-primary-400"
        />
      </div>

      {/* Password */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="password"
          className="block text-sm font-semibold text-neutral-950">
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-neutral-300 text-neutral-950 rounded-xl focus:outline-none focus:ring-primary-400"
        />
      </div>

      {/* Confirm Password */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="confirm-password"
          className="block text-sm font-semibold text-neutral-950">
          Confirm Password
        </label>
        <input
          id="confirm-password"
          type="password"
          required
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-4 py-2 border border-neutral-300 text-neutral-950 rounded-xl focus:outline-none focus:ring-primary-400"
        />
      </div>

       <Button
        text={isPending ? "Register in..." : "Register"}
        disabled={isPending}
        type="submit"
        className="w-[182px] h-12 cursor-pointer"></Button>


      <h2 className="text-center">
        Already have an account?
        <Link href="/login" className="text-primary-300">
          Log In
        </Link>
      </h2>
    </form>
  );
}
