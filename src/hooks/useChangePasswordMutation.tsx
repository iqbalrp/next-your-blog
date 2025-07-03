// hooks/useChangePasswordMutation.ts
import { useMutation } from "@tanstack/react-query"
import { changePassword, ChangePasswordPayload } from "@/services/auth"
import { useAuth } from "@/context/AuthContext"

export const useChangePasswordMutation = () => {
  const { token } = useAuth()

  return useMutation({
    mutationFn: (payload: ChangePasswordPayload) =>
      changePassword(payload, token!),
  })
}
