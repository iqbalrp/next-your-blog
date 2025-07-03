"use client"
import Image, { ImageProps } from "next/image"
import { useState } from "react"
// import noPhoto from "/no-photo.jpg"
interface LCPImageProps extends Omit<ImageProps, "fill"> {
  className?: string
  containerClassName?: string
  priority?: boolean
  sizes?: string
  fallbackSrc?: string
}

const LCPImage = ({
  src,
  alt,
  className = "object-contain",
  containerClassName = "relative min-w-[340px] h-[258px] rounded-[6px]",
  priority = true,
  sizes = "340px",
  fallbackSrc = "/public/no-photo.jpg",
  ...props
}: LCPImageProps) => {
  const validSrc = typeof src === "string" && src ? src : fallbackSrc
  const [imgSrc, setImgSrc] = useState(validSrc)

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
        onError={() => {
          if (imgSrc !== fallbackSrc) setImgSrc(fallbackSrc)
        }}
      />
    </div>
  )
}

export default LCPImage
