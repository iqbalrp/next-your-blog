// import { useUser } from "@/hooks/useUser";
import Image from "next/image";
import Link from "next/link";
import ProfileModal from "./ProfileModal";
import { usePathname } from "next/navigation";
const OnlineUser = () => {
  // const { data: user, isLoading } = useUser();
  const pathName = usePathname();
  const hideText = ["/dashboard/posts/create"].includes(pathName);
  return (
    <div
      id="auth-on-header"
      className="flex justify-center items-center gap-6 divide-x divide-neutral-300">
      {!hideText && (
        <Link
          href="/dashboard/posts/create"
          className="flex items-center justify-center gap-2">
          <div className="relative  w-[24px] aspect-square">
            <Image
              className=" object-contain "
              src="/icons/icon-pen.svg"
              fill
              alt="write blog"
              priority
            />
          </div>

          <span className="pr-4 text-primary-300 font-semibold text-sm leading-sm space-x-sm tracking-display-2xl underline">
            Write Post
          </span>
        </Link>
      )}

      <div className=" h-full w-[113px] ">
        <ProfileModal />
      </div>
    </div>
  );
};

export default OnlineUser;
