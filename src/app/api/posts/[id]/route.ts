import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function DELETE(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  const { id } = await props.params;
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const res = await fetch(`${process.env.API_BASE_URL}/posts/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  const text = await res.text();
  let payload;

  try {
    payload = JSON.parse(text);
  } catch {
    payload = { message: text || "Unknown server response" };
  }

  return NextResponse.json(payload, { status: res.status });
}
