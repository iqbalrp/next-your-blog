import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "@/services/posts/services";

export const useDeletePost = (token: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: number) => deletePost(postId, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-posts"] });
    },
  });
};
