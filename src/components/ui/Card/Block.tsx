import type { ReactNode } from "react"

const Block = ({ children }: { children: ReactNode }) => (
  <div className="w-full flex flex-col gap-4">{children}</div>
)

export default Block
