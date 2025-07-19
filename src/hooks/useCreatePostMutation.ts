import { useMutation } from "@tanstack/react-query";
import {
  createPost,
  CreatePostPayload,
  ResponseCreatePost,
} from "@/services/posts/services";

export function useCreatePost() {
  return useMutation<ResponseCreatePost, Error, CreatePostPayload>({
    mutationFn: async (payload) => {
      try {
        return await createPost(payload);
      } catch (error) {
        // Optional: bisa langsung throw Error biar ditangani di komponen
        throw error;
      }
    },
    onError: (error) => {
      console.error("❌ Gagal membuat post:", error.message);
      // Kamu bisa trigger toast di sini juga kalau pakai zustand / context
    },
    onSuccess: (data) => {
      console.log("✅ Post berhasil dibuat:", data.title);
      // Redirect / show toast bisa dipicu di sini juga kalau perlu
    },
  });
}
