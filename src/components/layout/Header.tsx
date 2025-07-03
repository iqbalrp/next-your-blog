import { Logo } from "../ui/Logo";
import { Input } from "../ui/Input";
import OfflineUser from "./navbar/OfflineUser";
import OnlineUser from "./navbar/OnlineUser";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { usePathname } from "next/navigation";
const Header = () => {
  const pathName = usePathname();
  const hideLogoAndForm = ["/dashboard/posts/create"].includes(pathName);
  const { token } = useAuth();
  const router = useRouter();
  const [input, setInput] = useState("");
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const encoded = encodeURIComponent(input.trim());
    if (encoded) {
      router.push(`/search?query=${encoded}&page=1`);
    }
  };
  return (
    <header className="fixed z-50 inset-0 top-0 flex bg-white justify-between items-center h-[80px] w-full px-[120px] border-b border-neutral-300">
      {!hideLogoAndForm ? (
        <>
          <Logo />
          <form onSubmit={handleSearch}>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Search"
            />
          </form>{" "}
        </>
      ) : (
        <Logo iconSrc="/icons/icon-arrow-left.svg" text="Write Post" />
      )}

      {token ? <OnlineUser /> : <OfflineUser />}
    </header>
  );
};

export default Header;
