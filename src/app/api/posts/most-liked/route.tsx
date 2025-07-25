import { NextRequest, NextResponse } from "next/server";
import { api } from "@/services/api";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "10";

  try {
    const response = await api.get(`/posts/most-liked`, {
      params: { page, limit },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch recommended posts.",
        details: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}
