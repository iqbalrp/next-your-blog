import { useQuery } from "@tanstack/react-query"
import { useAuth } from "@/context/AuthContext"
import { decodeToken } from "@/lib/utils/jwt"
import { fetchUserByEmail } from "@/services/auth"

export const useUser = () => {
  const { token } = useAuth()
  const payload = token ? decodeToken(token) : null
  const email = payload?.email

  return useQuery({
    queryKey: ["user", email],
    queryFn: () => fetchUserByEmail(email!),
    enabled: !!email,
  })
}
