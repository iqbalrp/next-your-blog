export interface InputProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  iconSearchSrc?: string;
  inputClassName?: string;
  iconClassName?: string;
}