import { useMutation } from "@tanstack/react-query"
import { LoginPayload } from "@/services/user"
import { useRouter } from "next/navigation"

export const useLoginMutation = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Login gagal")
      }

    },
    onSuccess: () => {
      router.push("/")
    },
    onError: (error: any) => {
      alert(error.message || "Login gagal. Silakan coba lagi.")
      console.error("Login error:", error)
    },
  })
}
