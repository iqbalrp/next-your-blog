import Link from "next/link"
import { Button } from "@/components/ui/Button"
const OfflineUser = () => {
  return (
    <div
        id="auth-off-header"
        className="flex  justify-center items-center gap-6 divide-x divide-neutral-300">
        <Link
          href="/login"
          className="pr-4 text-primary-300 font-semibold text-sm leading-sm space-x-sm tracking-display-2xl underline">
          Login
        </Link>
        <Button fullWidth={false} text="Register" href="/register" className="w-[182px] h-11"></Button>
       
      </div>
  )
}

export default OfflineUser
