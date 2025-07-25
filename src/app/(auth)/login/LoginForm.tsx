"use client";

import Link from "next/link";
import { useState } from "react";
import { useLoginMutation } from "@/hooks/useLoginMutation";
import { Button } from "@/components/ui/Button";
import { ModalMessage } from "@/components/ui/Dialog/DialogMessage";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalStatus, setModalStatus] = useState<"success" | "error">(
    "success"
  );

  const { mutate, isPending } = useLoginMutation({
    onSuccess: (data) => {
      setModalMessage(data.message || "Login successful");
      setModalStatus("success");
      setModalOpen(true);
    },
    onError: () => {
      setModalMessage("Login failed. Please try again.");
      setModalStatus("error");
      setModalOpen(true);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ email, password });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-[345px] md:w-[360px] bg-white flex flex-col gap-[20px] p-6 rounded-xl shadow-[0_0_24px_0_#CDCCCC29] border border-neutral-200">
        <h2 className="text-xl font-bold leading-xl space-x-xl tracking-display-2xl text-neutral-900">
          Sign In
        </h2>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="email"
            className="block text-sm font-semibold leading-sm space-x-sm tracking-display-2xl text-neutral-950">
            Email
          </label>
          <input
            type="email"
            id="email"
            required
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-neutral-300 text-neutral-950 rounded-xl focus:outline-none focus:ring-primary-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="password"
            className="block text-sm font-semibold leading-sm space-x-sm tracking-display-2xl text-neutral-950">
            Password
          </label>
          <input
            type="password"
            id="password"
            required
            placeholder="Enter your password"
            className="w-full px-4 py-2 border border-neutral-300 text-neutral-950 rounded-xl focus:outline-none focus:ring-primary-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button
          text={isPending ? "Logging in..." : "Login"}
          disabled={isPending}
          type="submit"
          className="w-[182px] h-12 cursor-pointer"
        />

        <h2 className="text-center">
          {"Don't have an account?"}
          <Link href="/register" className="text-primary-300">
            Register
          </Link>
        </h2>
      </form>

      <ModalMessage
        open={modalOpen}
        onOpenChange={setModalOpen}
        title="Login Status"
        message={modalMessage}
        status={modalStatus}
        autoClose
      />
    </>
  );
}
