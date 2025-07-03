"use client";
import { useQuery } from "@tanstack/react-query";
import { mostLikedPosts, GetResponse } from "@/services/posts/services";

export const useMostLikedQuery = (page: number) => {
  return useQuery<GetResponse>({
    queryKey: ["mostliked-posts", page],
    queryFn: () => mostLikedPosts(page),
    staleTime: 1000 * 60 * 5,
  });
};
