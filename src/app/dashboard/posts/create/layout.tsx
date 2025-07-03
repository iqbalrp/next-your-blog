import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import CreatePostHeader from "./CreatePostHeader";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login?callback=/dashboard/posts/create");
  }

  return (
    <>
      <CreatePostHeader />
      {children}
    </>
  );
}
