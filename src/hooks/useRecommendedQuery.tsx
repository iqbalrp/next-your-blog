"use client";
import { useQuery } from "@tanstack/react-query";
import { getRecommendedPosts, GetResponse } from "@/services/posts/services";

export const useRecommendedPosts = (page: number) => {
  return useQuery<GetResponse>({
    queryKey: ["recommended-posts", page],
    queryFn: () => getRecommendedPosts(page),
    staleTime: 1000 * 60 * 5,
  });
};
