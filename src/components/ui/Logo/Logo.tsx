import Image from "next/image"
import Link from "next/link"

interface LogoProps {
  iconSrc?: string
  text?: string
  iconAlt?: string
  showText?: boolean
  href?: string
  className?: string
  textClassName?: string
  iconClassName?: string
  iconPosition?: "left" | "right" // ← tambahan baru
}

const Logo = ({
  iconSrc = "/logo.svg",
  text = "Your Blog",
  iconAlt = "Your Blog",
  showText = true,
  href = "/",
  iconPosition = "left",
  className = "flex justify-center items-center gap-[9.6px] w-[160px]",
  textClassName = "font-semibold text-[24px] leading-[36px] space-x-[24px] whitespace-nowrap",
  iconClassName = "relative w-[30px] aspect-[29.59/32.46]",
}: LogoProps) => {
  const iconEl = (
    <div className={iconClassName}>
      <Image src={iconSrc} fill alt={iconAlt} className="object-contain" priority />
    </div>
  )

  const textEl = showText && <span className={textClassName}>{text}</span>

  const content = (
    <div id="logo-header" className={className}>
      {iconPosition === "left" ? (
        <>
          {iconEl}
          {textEl}
        </>
      ) : (
        <>
          {textEl}
          {iconEl}
        </>
      )}
    </div>
  )

  return href ? <Link href={href}>{content}</Link> : content
}

export default Logo
