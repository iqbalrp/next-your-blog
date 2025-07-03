"use client";
import Card from "@/components/ui/Card";
import { Logo } from "@/components/ui/Logo";
import { useMostLikedQuery } from "@/hooks/useMostLikedQuery";
import { useSearchParams } from "next/navigation";

export default function MostLikedPosts() {
  const searchParams = useSearchParams();
  const rawPage = Number(searchParams.get("page"));
  const currentPage = Number.isNaN(rawPage) || rawPage < 1 ? 1 : rawPage;

  const { data, isLoading, isError } = useMostLikedQuery(currentPage);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong!</p>;

  return (
    <div className="w-full lg:w-[300px] pl-7">
      <h2 className="text-xl font-bold mb-4">Most Liked</h2>
      {data?.data.map((post) => (
        <Card key={post.id} showTopBorder={false}>
          <Card.Block>
            <Card.Content
              title={post.title}
              tags={post.tags}
              description={post.content}
              titleClassName="text-md font-bold text-neutral-900"
              descriptionClassName="w-[297px] h-[56px] overflow-hidden text-ellipsis text-sm text-neutral-700"
            />
            <Card.Footer.Author
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
    </div>
  );
}
