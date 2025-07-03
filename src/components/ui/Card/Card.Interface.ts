export type CardProps = {
  title: string
  tags: string[]
  description: string
  imageUrl: string
  imageAlt?: string
  footerType: "author" | "meta"
  author?: {
    name: string
    avatarUrl: string
    date: string
  }
  createdAt?: string
  updatedAt?: string
  actions?: React.ReactNode
}
