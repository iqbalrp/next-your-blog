import { useQuery } from "@tanstack/react-query"
import { myPosts } from "@/services/auth"
import { useAuth } from "@/context/AuthContext"

export const useMyPostsQuery = () => {
  const { token } = useAuth()

  return useQuery({
    queryKey: ["my-posts"],
    queryFn: () => myPosts(token!),
    enabled: !!token, // hanya fetch kalau token tersedia
  })
}
