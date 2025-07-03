"use client";
import Image from "next/image";
import { Logo } from "@/components/ui/Logo";
import { useMyPostsQuery } from "@/hooks/useMyPostsQuery";
import { Button } from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import PenIcon from "@/components/ui/PenIcon";
const UserPosts = () => {
  const { data, isLoading, isError } = useMyPostsQuery();

  if (isLoading)
    return <p className="text-sm text-neutral-500">Memuat postingan...</p>;
  if (isError)
    return <p className="text-sm text-red-500">Gagal memuat postingan kamu.</p>;

  if (!data || data.data.length === 0) {
    return (
      <div className="flex flex-col gap-6 justify-center items-center w-[372px] mt-[129px] ">
        <Logo
          iconSrc="/icons/icon-doc.svg"
          showText={false}
          iconClassName="relative w-[118.12px] h-[135px]"
        />

        <div className=" w-full flex flex-col items-center gap-1 text-neutral-950">
          <h3 className="font-semibold text-sm leading-sm space-x-sm tracking-display-2xl">
            Your writing journey starts here
          </h3>
          <p className=" font-normal text-sm leading-sm space-x-sm tracking-display-2xl">
            No posts yet, but every great writer starts with the first one.
          </p>
        </div>
        <Button
          iconLeft={<PenIcon className="w-4 h-4 text-white" />}
          text="Write Post"
        />
      </div>
    );
  }

  return (
    <div className="min-w-full pt-5">
      <div className="w-full flex justify-between items-center">
        <h2 className="font-bold text-display-xs leading-display-xs space-x-6 tracking-display-2xl">
          5 Post
        </h2>
        <Button
          iconLeft={<PenIcon className="w-4 h-4 text-white" />}
          text="Write Post"
          fullWidth={false}
          className=" h-11 w-[182px]"
        />
      </div>
      <Card>
        <div className="relative min-w-[340px] h-[258px] rounded-[6px]">
          <Image
            src="/illustration.png"
            alt="..."
            fill
            className="object-contain"
          />
        </div>

        <Card.Block>
          <Card.Content
            title="5 Reasons to Learn Frontend Development in 2025"
            tags={["Programming", "Frontend", "Coding"]}
            description="Frontend development is more than just building beautiful user
                interfaces — it's about crafting user experiences that are fast,
                accessible, and intuitive. As we move into 2025, the demand for
                skilled frontend developers continues to rise."
          />
          <Card.Footer.Author
            author={{
              name: "Wati",
              avatarUrl: "/user.png",
              date: "27 May 2025",
            }}
            stats={
              <div className="flex justify-start items-center gap-5">
                <Logo
                  iconSrc="/icons/icon-like.svg"
                  text="20"
                  iconClassName="relative h-5 w-5"
                  textClassName="font-normal text-sm leading-sm space-x-sm"
                  className="flex justify-center items-center w-[43px] gap-1.5"
                />
                <Logo
                  iconSrc="/icons/icon-comment.svg"
                  text="20"
                  iconClassName="relative h-5 w-5"
                  textClassName="font-normal text-sm leading-sm space-x-sm"
                  className="flex justify-center items-center w-[43px] gap-1.5"
                />
              </div>
            }
          />
        </Card.Block>
      </Card>

      <Card showTopBorder={false}>
        <div className="relative min-w-[340px] h-[258px] rounded-[6px]">
          <Image
            src="/illustration.png"
            alt="illustration"
            fill
            className="object-contain"
            loading="lazy"
          />
        </div>

        <Card.Block>
          <Card.Content
            title="5 Reasons to Learn Frontend Development in 2025"
            tags={["Programming", "Frontend", "Coding"]}
            description="Frontend development is more than just building beautiful user interfaces — it's about crafting user experiences that are fast, accessible, and intuitive."
          />

          <Card.Footer.Meta
            createdAt="28 May 2025, 19:00"
            updatedAt="28 May 2025, 19:00"
            actions={
              <>
                <Button
                  variant="ghost"
                  className=" cursor-pointer h-7 w-[53px] hover:bg-transparent rounded-none"
                  fullWidth={false}
                  text="Static"
                  textClassName="pr-3 text-primary-300 font-semibold text-sm leading-sm space-x-sm tracking-display-2xl underline"
                />
                <Button
                  variant="ghost"
                  className=" cursor-pointer h-7 w-[53px] hover:bg-transparent rounded-none"
                  fullWidth={false}
                  text="Edit"
                  textClassName="px-3 text-primary-300 font-semibold text-sm leading-sm space-x-sm tracking-display-2xl underline"
                />
                <Button
                  variant="danger"
                  className=" cursor-pointer h-7 w-[53px] hover:bg-transparent  bg-transparent rounded-none "
                  fullWidth={false}
                  text="Delete"
                  textClassName="pl-3 text-red-500 font-semibold text-sm leading-sm space-x-sm tracking-display-2xl underline"
                />
              </>
            }
          />
        </Card.Block>
      </Card>
    </div>

  );
};

export default UserPosts;
