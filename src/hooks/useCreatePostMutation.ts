import { useMutation } from "@tanstack/react-query"
import { createPost, CreatePostPayload, ResponseCreatePost } from "@/services/posts/services"

export function useCreatePost() {
  return useMutation<ResponseCreatePost, Error, CreatePostPayload>({
    mutationFn: createPost,
  })
}
