import type { ButtonProps } from "./Button.interface";
import clsx from "clsx";
import Link from "next/link";

const Button = ({
  text,
  iconLeft,
  iconRight,
  href,
  disabled,
  isLoading,
  onClick,
  fullWidth = true,
  variant = "primary",
  className = "",
  textClassName = "text-neutral-25",
  type,
}: ButtonProps) => {
  const variantClasses = {
    primary: "bg-primary-300 hover:bg-primary-200 text-white",
    ghost: "bg-transparent text-primary-300 hover:bg-primary-100",
    danger: "bg-red-500 hover:bg-red-600 text-white",
  };

  const baseClass = clsx(
    "flex justify-center items-center px-4 py-2 rounded-full text-sm font-semibold transition gap-2",
    {
      "w-full h-[48px]": fullWidth,
      "opacity-50 cursor-not-allowed pointer-events-none":
        disabled || isLoading,
    },
    variantClasses[variant],
    className
  );

  const content = (
  <>
    {isLoading ? (
      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
    ) : (
      <>
        {iconLeft && <span className="flex-shrink-0">{iconLeft}</span>}
        {text && <span className={textClassName}>{text}</span>}
        {iconRight && <span className="flex-shrink-0">{iconRight}</span>}
      </>
    )}
  </>
)

  if (href && !disabled) {
    return (
      <Link href={href} className={baseClass}>
        {content}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={baseClass}
      type={type || "button"}>
      {content}
    </button>
  );
};

export default Button;
