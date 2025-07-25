import RecommendedPosts from "@/components/pages/home/RecommendedPosts";
import MostLikedPosts from "@/components/pages/home/MostLikedPosts";
import { Suspense } from "react";
export default function HomePage() {
  return (
    <section className="flex justify-center w-full pt-32 pb-[156px]">
      <div className="flex flex-col lg:flex-row gap-[25px] items-start lg:w-[1200px]">
        <div className="w-full lg:w-[807px] mr-7">
          <Suspense fallback={<p>Loading...</p>}>
            <RecommendedPosts />
          </Suspense>
        </div>

        <div className="w-px h-full bg-neutral-300" />

        <aside className="w-full lg:w-[300px] pl-7">
          <Suspense fallback={<p>Loading...</p>}>
            <MostLikedPosts />
          </Suspense>
        </aside>
      </div>
    </section>
  );
}
