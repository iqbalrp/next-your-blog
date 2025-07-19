import { useQuery } from "@tanstack/react-query";
import { myPosts, MyPostResponse } from "@/services/posts/services";

export const useMyPostsQuery = (
  page: number = 1,
  limit: number = 10,
  token?: string | null
) => {
  return useQuery<MyPostResponse>({
    queryKey: ["my-posts", page, limit, token],
    queryFn: () => {
      if (!token) throw new Error("Token tidak tersedia");
      return myPosts(page, limit, token);
    },
    staleTime: 1000 * 60 * 5, // 5 menit
    refetchOnWindowFocus: false,
  });
};
