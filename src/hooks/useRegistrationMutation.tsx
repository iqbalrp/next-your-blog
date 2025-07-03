
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { registerUser, RegisterPayload, RegisterResponse } from "@/services/auth"

export const useRegistrationMutation = () => {
  const router = useRouter()
  return useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      alert("Registrasi berhasil!")
      router.push("/login")
    },
    onError: (error: any) => {
      if (error?.response?.data?.message) {
        alert(error.response.data.message)
      } else {
        alert("Registrasi gagal. Silakan coba lagi.")
      }
    },
  })
}
