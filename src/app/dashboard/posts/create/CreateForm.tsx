"use client";

import { useState, useRef } from "react";
import { useCreatePost } from "@/hooks/useCreatePostMutation";
import Editor from "@/components/ui/Editor/Editor";
import ImageUploader from "@/components/ui/ImageUploader";
import TagInput from "@/components/ui/TagInput";
import { Button } from "@/components/ui/Button";
import type { CreatePostPayload } from "@/services/posts/services";
import type EditorJS from "@editorjs/editorjs";

export default function CreateForm() {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const editorRef = useRef<EditorJS | null>(null);
  const { mutateAsync } = useCreatePost();
  type EditorBlock = {
    type: string;
    data: { text: string };
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};
    let contentJSON = null;

    // Validate editor content
    try {
      const saved = await editorRef.current?.save();
      if (!saved || saved.blocks.length === 0) {
        setErrors((prev) => ({
          ...prev,
          content: "Content must not be empty",
        }));
        return;
      }
      contentJSON = saved;
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Unknown error occurred";

      setErrors((prev) => ({
        ...prev,
        content: message,
      }));
      return;
    }

    // Validate fields
    if (!title.trim()) newErrors.title = "Title is required";
    if (tags.length === 0) newErrors.tags = "Minimum 1 tag";
    if (!image) newErrors.image = "Image must be uploaded";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    if (!image) {
      setErrors((prev) => ({ ...prev, image: "Image must be uploaded" }));
      return;
    }

    const payload: CreatePostPayload = {
      title,
      content: contentJSON.blocks
        .map((b: EditorBlock) => b.data.text)
        .join("\n\n"),
      tags,
      image, // ✅ TypeScript tahu ini bukan null
    };
    try {
      const result = await mutateAsync(payload);
      alert(`✅ Post berhasil dibuat: ${result.title}`);
      // redirect(`/dashboard/posts`) kalau kamu mau
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to submit post";
      console.error("❌ Failed to submit post:", error);
      setErrors({ general: message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[361px] lg:w-[807px] flex flex-col gap-5">
      {/* Title */}
      <div className="flex flex-col gap-1.5">
        <label className="font-semibold text-sm text-neutral-950">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-neutral-300 rounded-xl h-12 px-4"
          placeholder="Enter your title"
        />
        {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
      </div>

      {/* Editor */}
      <div className="flex flex-col gap-1.5">
        <label className="font-semibold text-sm text-neutral-950">
          Content
        </label>
        <Editor ref={editorRef} />
        {errors.content && (
          <p className="text-sm text-red-500">{errors.content}</p>
        )}
      </div>

      {/* Thumbnail */}
      <div className="flex flex-col gap-1.5">
        <label className="font-semibold text-sm text-neutral-950">
          Thumbnail
        </label>
        <ImageUploader onFileSelect={(file) => setImage(file)} />
        {errors.image && <p className="text-sm text-red-500">{errors.image}</p>}
      </div>

      {/* Tags */}
      <div className="flex flex-col gap-1.5">
        <label className="font-semibold text-sm text-neutral-950">Tags</label>
        <TagInput onChange={setTags} />
        {errors.tags && <p className="text-sm text-red-500">{errors.tags}</p>}
      </div>

      {/* Submit */}
      <Button
        type="submit"
        text={loading ? "Saving..." : "Finish"}
        disabled={loading}
      />
    </form>
  );
}
