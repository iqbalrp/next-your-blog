import { useMutation } from "@tanstack/react-query";
import { LoginPayload } from "@/services/user";
import { useRouter } from "next/navigation";

interface LoginMutationOptions {
  onSuccess?: (data: { message: string }) => void;
  onError?: (error: unknown) => void;
}

export const useLoginMutation = ({ onSuccess, onError }: LoginMutationOptions = {}) => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Login gagal");
      }

      return result;
    },
    onSuccess: (data) => {
      onSuccess?.(data); // modal handling di caller
      router.push("/");  // tetap redirect
    },
    onError: (error) => {
      onError?.(error); // modal handling di caller
      // console.error("Login error:", error);
    },
  });
};
