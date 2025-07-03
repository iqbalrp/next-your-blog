"use client";

import { useSearchParams } from "next/navigation";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useSearchPosts } from "@/hooks/useSearchQuery";
import { Logo } from "@/components/ui/Logo";
import { Pagination } from "@/components/ui/Pagination";
import Card from "@/components/ui/Card";
import LCPImage from "@/components/ui/LCPImage";
import NotFound from "./NotFound";

export default function SearchResult() {
  const params = useSearchParams();
  const query = params.get("query") || "";
  const currentPage = Number(params.get("page")) || 1;

  const debouncedQuery = useDebouncedValue(query, 300);
  const { data, isLoading } = useSearchPosts(debouncedQuery, currentPage);

  return (
    <div className="px-6 py-12">
      <h1 className="text-2xl font-semibold mb-4">
        Result for <span className="text-primary">{`"${query}"`}</span>
      </h1>
      {isLoading && <p>Memuat hasil...</p>}
      {!isLoading && data?.data?.length === 0 && <NotFound />}
      if (!data || data.data.length === 0) {}
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
    </div>
  );
}
