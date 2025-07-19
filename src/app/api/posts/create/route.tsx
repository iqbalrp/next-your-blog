import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // 🔍 Ambil isi FormData
  const form = await request.formData();
  const title = form.get("title");
  const content = form.get("content");
  const tags = form.get("tags");
  const image = form.get("image");

   console.log("route title :" + title)
   console.log("route content :" + content)
   console.log("route tags :" + tags)
   console.log("route image :" + image)

  const missing: string[] = [];
  if (!title) missing.push("title");
  if (!content) missing.push("content");
  if (!tags) missing.push("tags");
  if (!image || !(image instanceof File)) missing.push("image");

  if (missing.length > 0) {
    return NextResponse.json(
      { message: `FormData incomplete: ${missing.join(", ")}` },
      { status: 400 }
    );
  }

  // ✅ Rekonstruksi FormData untuk dikirim ke backend
  const backendForm = new FormData();
  if (title && typeof title === "string") backendForm.append("title", title);
  if (content && typeof content === "string")
    backendForm.append("content", content);
  if (tags && typeof tags === "string") backendForm.append("tags", tags);
  if (image && image instanceof File) backendForm.append("image", image);

  const res = await fetch(`${process.env.API_BASE_URL}posts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: backendForm,
  });

  const text = await res.text();
  console.log("📥 Backend response:", res.status, text);

  return new Response(text, {
    status: res.status,
    headers: { "Content-Type": "application/json" },
  });
}
