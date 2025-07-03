"use client";
import Image from "next/image";
import { useRef, useState } from "react";

interface ImageUploaderProps {
  onFileSelect?: (file: File) => void;
}

export default function ImageUploader({ onFileSelect }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = (file: File) => {
    if (!["image/png", "image/jpeg"].includes(file.type)) {
      setError("Only PNG and JPG images are allowed.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Maximum size 5MB.");
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
    setError(null);
    onFileSelect?.(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div
      className={`border-2 border-dashed rounded-md p-6 text-center transition cursor-pointer ${
        dragActive ? "bg-blue-50 border-blue-400" : "border-gray-300"
      }`}
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setDragActive(true);
      }}
      onDragLeave={() => setDragActive(false)}
      onDrop={handleDrop}>
      <input
        type="file"
        accept="image/png, image/jpeg"
        ref={inputRef}
        onChange={handleChange}
        className="hidden"
      />

      <p className="text-gray-600">
        <span className="font-medium text-blue-500">Click to upload</span> or
        drag and drop image (PNG, JPG, max 5MB)
      </p>

      {preview && (
        <Image
          src={preview}
          alt="Preview"
          width={300} // atau sesuaikan dengan preview kamu
          height={192} // sesuaikan rasio aspek dari max-h-48 (~192px)
          className="mt-4 mx-auto rounded border object-contain"
        />
      )}

      {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
    </div>
  );
}
