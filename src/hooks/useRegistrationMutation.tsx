import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/services/auth";
import axios from "axios";
export const useRegistrationMutation = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      alert("Registrasi berhasil!");
      router.push("/login");
    },
    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message;
        alert(message || "Registrasi gagal. Silakan coba lagi.");
      } else {
        alert("Registrasi gagal. Silakan coba lagi.");
      }
    },
  });
};
