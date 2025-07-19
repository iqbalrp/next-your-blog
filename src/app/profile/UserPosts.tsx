"use client";

import Image from "next/image";
import { Logo } from "@/components/ui/Logo";
import { useMyPostsQuery } from "@/hooks/useMyPostsQuery";
import { Button } from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import PenIcon from "@/components/ui/PenIcon";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { DialogConfirmDelete } from "@/components/ui/Dialog/DialogConfirmDelete";
import { deletePost } from "@/services/posts/services";
import { useQueryClient } from "@tanstack/react-query";
import {DialogStatistic} from "@/components/ui/Dialog/DialogStatistic";

const UserPosts = () => {
  const token = useAuth().token;
  const queryClient = useQueryClient();

  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { data, isLoading, isError } = useMyPostsQuery(
    1,
    10,
    token ?? undefined
  );
const [statisticOpen, setStatisticOpen] = useState(false);

  const handleDelete = async () => {
    if (!selectedPostId || !token) return;
    try {
      await deletePost(selectedPostId, token);
      queryClient.invalidateQueries({ queryKey: ["my-posts"] });
    } catch (error) {
      console.error("Gagal menghapus post", error);
    } finally {
      setModalOpen(false);
      setSelectedPostId(null);
    }
  };

  if (isLoading)
    return <p className="text-sm text-neutral-500">Loading posts...</p>;

  if (isError)
    return <p className="text-sm text-red-500">Failed to load your post.</p>;

  if (!data || data.data.length === 0) {
    return (
      <div className="flex flex-col gap-6 justify-center items-center w-[372px] mt-[129px] ">
        <Logo
          iconSrc="/icons/icon-doc.svg"
          showText={false}
          iconClassName="relative w-[118.12px] h-[135px]"
        />
        <div className="w-full flex flex-col items-center gap-1 text-neutral-950">
          <h3 className="font-semibold text-sm">
            Your writing journey starts here
          </h3>
          <p className="font-normal text-sm">
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
      <div className="w-full flex justify-between items-center ">
        <h2 className="font-bold text-display-xs">
          {data.total} Post{data.total > 1 ? "s" : ""}
        </h2>
        <Button
          href="/dashboard/posts/create"
          iconLeft={<PenIcon className="w-4 h-4 text-white" />}
          text="Write Post"
          fullWidth={false}
          className="h-11 w-[182px]"
        />
      </div>

      <div className="grid gap-6 mt-6">
        {data.data.map((post) => (
          <Card key={post.id} showTopBorder={true} showBottomBorder={false}>
            <div className="relative min-w-[340px] h-[258px] rounded-[6px]">
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                className="object-contain"
                loading="lazy"
              />
            </div>

            <Card.Block>
              <Card.Content
                title={post.title}
                tags={post.tags}
                description={post.content}
              />
              <Card.Footer.Meta
                createdAt={new Date(post.createdAt).toLocaleString("id-ID", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
                updatedAt={new Date(post.createdAt).toLocaleString("id-ID", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
                actions={
                  <>
                    <Button
                    onClick={() => setStatisticOpen(true)}
                      variant="ghost"
                      className="cursor-pointer h-7 w-[53px] hover:bg-transparent rounded-none"
                      fullWidth={false}
                      text="Statistic"
                      textClassName="pr-3 text-primary-300 font-semibold text-sm underline"
                    />
                    <Button
                      variant="ghost"
                      className="cursor-pointer h-7 w-[53px] hover:bg-transparent rounded-none"
                      fullWidth={false}
                      text="Edit"
                      textClassName="px-3 text-primary-300 font-semibold text-sm underline"
                    />
                    <Button
                      onClick={() => {
                        setSelectedPostId(post.id);
                        setModalOpen(true);
                      }}
                      variant="danger"
                      className="cursor-pointer h-7 w-[53px] bg-transparent rounded-none hover:bg-transparent"
                      fullWidth={false}
                      text="Delete"
                      textClassName="pl-3 text-red-500 font-semibold text-sm underline"
                    />
                  </>
                }
              />
            </Card.Block>
          </Card>
        ))}
      </div>

      {/* Modal Delete dipanggil sekali di luar loop */}
      <DialogConfirmDelete
        open={modalOpen}
        onOpenChange={setModalOpen}
        onDelete={handleDelete}
      />
      <DialogStatistic
        open={statisticOpen}
        onOpenChange={setStatisticOpen}
      />
    </div>
  );
};

export default UserPosts;
