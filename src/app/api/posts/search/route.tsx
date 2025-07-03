import { NextRequest, NextResponse } from "next/server"
import { api } from "@/services/api"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("query") || ""
  const page = searchParams.get("page") || "1"
  const limit = searchParams.get("limit") || "10"

  console.log("🔎 Search route hit:", { query, page, limit })

  try {
    const response = await api.get("/posts/search", {
      params: { query, page, limit },
    })

    return NextResponse.json(response.data)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch search results." },
      { status: 500 }
    )
  }
}
