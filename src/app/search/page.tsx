import SearchResult from "./SearchResults";
import { Suspense } from "react";
export default function SearchPage() {
  return (
    <div className="flex justify-center w-full pt-32 pb-[156px]">
      <div className="flex flex-col lg:flex-row gap-[25px] items-start lg:w-[1200px]">
        <div className="w-full lg:w-[807px] mr-7">
          <Suspense fallback={<p>Loading...</p>}>
            <SearchResult />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
