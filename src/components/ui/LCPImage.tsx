"use client";

import Image, { ImageProps } from "next/image";
import { useCallback, useEffect, useState } from "react";

/** Bersihkan setiap path agar valid utk <Image/> */
const normalizeSrc = (raw: string): string => {
  if (!raw) return "";

  // Sudah absolut (http/https) atau sudah dari public (diawali /) → biarkan
  if (raw.startsWith("http") || raw.startsWith("/")) return raw;

  // Kalau hanya "nama-file.jpg" → tambahkan leading slash
  return `/${raw.replace(/^\/+/, "")}`;
};

interface LCPImageProps extends Omit<ImageProps, "fill"> {
  className?: string;
  containerClassName?: string;
  priority?: boolean;
  sizes?: string;
  fallbackSrc?: string;
}

const LCPImage = ({
  src,
  alt,
  className = "object-contain",
  containerClassName = "relative w-[340px] h-[258px] rounded-[6px]",
  priority = true,
  sizes = "340px",
  fallbackSrc = "/no-photo.jpg",
  ...props
}: LCPImageProps) => {
  /** Pastikan fallback sudah valid sekali saja */
  const safeFallbackSrc = normalizeSrc(fallbackSrc);

  /** Tentukan sumber awal yang aman */
  const [imgSrc, setImgSrc] = useState(
    () => normalizeSrc(typeof src === "string" ? src : "") || safeFallbackSrc
  );

  /** Jika prop `src` berubah, re‑evaluasi */
  useEffect(() => {
    setImgSrc(
      normalizeSrc(typeof src === "string" ? src : "") || safeFallbackSrc
    );
  }, [src, safeFallbackSrc]);

  /** Hanya dipanggil sekali jika request gambar gagal */
  const handleError = useCallback(() => {
    setImgSrc(safeFallbackSrc);
  }, [safeFallbackSrc]);
// console.log("Final image fallbackSrc:", fallbackSrc);
// console.log("Final image imgSrc:", imgSrc);
  return (
    <div className={containerClassName}>
      <Image
        {...props}
        src={imgSrc}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={className}
        loading={priority ? "eager" : "lazy"}
        onError={handleError}
      />
    </div>
  );
};

export default LCPImage;
