"use client";

import LCPImage from "@/components/ui/LCPImage";
import { useRecommendedPosts } from "@/hooks/useRecommendedQuery";
import Card from "@/components/ui/Card";
import { Logo } from "@/components/ui/Logo";
import { Pagination } from "@/components/ui/Pagination";
import { useSearchParams } from "next/navigation";

export default function RecommendedPosts() {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page") || 1);
  const { data, isLoading, isError } = useRecommendedPosts(currentPage);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong!</p>;

  return (
    <>
      <h2 className="text-xl font-bold mb-4">Recommend For You</h2>

      {data?.data.map((post) => (
        <Card key={post.id} showTopBorder={false}>
          <div className="relative min-w-[340px] h-[258px] rounded-[6px]">
            <LCPImage
              src={post.imageUrl}
              alt={post.title}
              sizes="(max-width: 768px) 100vw, 340px"
              fallbackSrc="no-photo.jpg"
            />
          </div>
          <Card.Block>
            <Card.Content
              title={post.title}
              tags={post.tags}
              description={post.content}
            />
            <Card.Footer.Author
              author={{
                name: post.author.name,
                avatarUrl: "/user.png",
                date: new Date(post.createdAt).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                }),
              }}
              stats={
                <div className="flex justify-start items-center gap-5">
                  <Logo
                    iconSrc="/icons/icon-like.svg"
                    text={String(post.likes)}
                    iconClassName="relative h-5 w-5"
                    textClassName="font-normal text-sm leading-sm space-x-sm"
                    className="flex justify-center items-center w-[43px] gap-1.5"
                  />
                  <Logo
                    iconSrc="/icons/icon-comment.svg"
                    text={String(post.comments)}
                    iconClassName="relative h-5 w-5"
                    textClassName="font-normal text-sm leading-sm space-x-sm"
                    className="flex justify-center items-center w-[43px] gap-1.5"
                  />
                </div>
              }
            />
          </Card.Block>
        </Card>
      ))}
      <Pagination currentPage={currentPage} totalPages={data?.lastPage ?? 1} />
    </>
  );
}
