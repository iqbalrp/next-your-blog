"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  const hideHeader = ["/login", "/register"].includes(pathName);

  return (
    <>
      {!hideHeader && <Header />}
      {children}
      {!hideHeader && <Footer />}
    </>
  );
}
