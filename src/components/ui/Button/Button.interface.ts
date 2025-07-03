export type ButtonProps = {
  text?: string
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
  href?: string
  disabled?: boolean
  fullWidth?: boolean
  onClick?: () => void
  className?: string
  textClassName?: string
  variant?: "primary" | "ghost" | "danger"
  isLoading?: boolean
  type?: "button" | "submit" | "reset"
}
