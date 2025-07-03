import { Button } from "@/components/ui/Button";
import PenIcon from "@/components/ui/PenIcon";
import { Logo } from "@/components/ui/Logo";
const NotFound = () => {
  return (
     <div className="flex flex-col gap-6 justify-center items-center w-[372px] mt-[129px] ">
          <Logo
            iconSrc="/icons/icon-doc.svg"
            showText={false}
            iconClassName="relative w-[118.12px] h-[135px]"
          />

          <div className=" w-full flex flex-col items-center gap-1 text-neutral-950">
            <h3 className="font-semibold text-sm leading-sm space-x-sm tracking-display-2xl">
              No results found
            </h3>
            <p className=" font-normal text-sm leading-sm space-x-sm tracking-display-2xl">
              Try using different keywords
            </p>
          </div>
          <Button
            href="/"
            fullWidth={false}
            className="w-[200px] h-11"
            text="Back to Home"
          />
        </div>
  )
}

export default NotFound
