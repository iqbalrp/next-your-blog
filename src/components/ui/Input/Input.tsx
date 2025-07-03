import Image from "next/image";
import type { InputProps } from "./Input.Interface";

const Input = ({
  value,
  onChange,
  placeholder = "Search",
  className = "flex items-center w-[373px] h-[48px] px-4 py-3 gap-2 border border-neutral-300 rounded-xl",
  iconSearchSrc = "/icons/icon-search.svg",
  inputClassName = "w-full h-full outline-none font-normal text-sm leading-sm space-x-sm",
  iconClassName = "relative  w-[24px] aspect-square",
}: InputProps) => {
  return (
    <div id="search-header" className={className}>
      <div className={iconClassName}>
        <Image
          className=" object-contain "
          src={iconSearchSrc}
          fill
          alt={placeholder}
          priority
        />
      </div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={inputClassName}
      />
    </div>
  );
};

export default Input;
