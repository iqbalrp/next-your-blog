"use client";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { searchPosts, GetResponse } from "@/services/posts/services";

export const useSearchPosts = (
  query: string,
  page = 1,
  limit = 10
): UseQueryResult<GetResponse, Error> => {
  return useQuery({
    queryKey: ["search-posts", query, page, limit],
    queryFn: () => searchPosts(query, page, limit),
    staleTime: 1000 * 60 * 5,
    enabled: !!query,
  });
};
