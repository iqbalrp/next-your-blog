import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // console.log("📥 Route handler /api/posts/create triggered");
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const res = await fetch(`${process.env.API_BASE_URL}posts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    body: request.body,
    duplex: "half",
  } as RequestInit & { duplex: "half" });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
  //   const text = await res.text()
  // console.log("🔁 Backend response:", res.status, text)

  // return new Response(text, { status: res.status })
}
