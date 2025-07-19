import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // Ambil parameter limit dan page dari URL query
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit") ?? "10";
  const page = searchParams.get("page") ?? "1";

  const apiUrl = `${process.env.API_BASE_URL}posts/my-posts?limit=${limit}&page=${page}`;

  const res = await fetch(apiUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  const text = await res.text();

  return new Response(text, {
    status: res.status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
