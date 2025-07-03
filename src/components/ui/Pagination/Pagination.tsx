"use client"
import { useRouter, useSearchParams } from "next/navigation"
import clsx from "clsx"
import {Logo} from "@/components/ui/Logo"
import { getVisiblePages } from "@/lib/utils/getVisiblePages"

type PaginationProps = {
  currentPage: number
  totalPages: number
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  const router = useRouter()
  const params = useSearchParams()

  const goToPage = (page: number) => {
    const newParams = new URLSearchParams(params.toString())
    newParams.set("page", String(page))
    router.push(`?${newParams.toString()}`)
  }

  const pages = getVisiblePages(currentPage, totalPages)

  return (
    <div className="w-full flex gap-4 mt-6 py-[10px] justify-center items-center">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="disabled:opacity-40"
      >
        <Logo
          text="Previous"
          iconSrc="/icons/icon-arrow.svg"
          className="flex gap-1.5 w-[84px] justify-center items-center"
          iconClassName="relative h-6 w-6"
          textClassName="text-sm font-normal"
        />
      </button>

      <div className="flex items-center gap-2">
        {pages.map((page, idx) =>
          page === "..." ? (
            <div
              key={`ellipsis-${idx}`}
              className="h-12 aspect-square flex items-center justify-center"
            >
              <span className="text-sm font-normal">...</span>
            </div>
          ) : (
            <button
              key={page}
              onClick={() => goToPage(Number(page))}
              className={clsx(
                "h-12 aspect-square rounded-full flex items-center justify-center cursor-pointer",
                {
                  "bg-primary-300 text-white": page === currentPage,
                  "hover:bg-neutral-100": page !== currentPage,
                }
              )}
            >
              <span className="text-sm font-normal tracking-display-2xl">{page}</span>
            </button>
          )
        )}
      </div>

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="disabled:opacity-40"
      >
        <Logo
          text="Next"
          iconPosition="right"
          iconSrc="/icons/icon-arrow.svg"
          iconClassName="relative h-6 w-6 rotate-180"
          className="flex gap-1.5 w-[84px] justify-center items-center"
          textClassName="text-sm font-normal"
        />
      </button>
    </div>
  )
}
