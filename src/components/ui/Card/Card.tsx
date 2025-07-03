import type { ReactNode } from "react"
import clsx from "clsx"

type CardProps = {
  children: ReactNode
  showTopBorder?: boolean
  showBottomBorder?: boolean
}

const Card = ({ children, showTopBorder = true, showBottomBorder = true }: CardProps) => {
  const borderClass = clsx("w-full py-6 border-neutral-300", {
    "border-t": showTopBorder,
    "border-b": showBottomBorder,
  })

  return (
    <div className={borderClass}>
      <div className="flex justify-center gap-6">{children}</div>
    </div>
  )
}

export default Card
