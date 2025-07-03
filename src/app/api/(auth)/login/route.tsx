// app/api/login/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { api } from "@/services/api";

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const { data } = await api.post("/auth/login", body);

    const token = data.token;

    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24,
    });

    cookieStore.set("token_ui", token, {
      httpOnly: false, // Supaya bisa dibaca oleh document.cookie
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24,
    });

    return NextResponse.json({ message: "Login success" }, { status: 200 });
  } catch (error: any) {
    const message = error?.response?.data?.message || "Login gagal";
    return NextResponse.json(
      { message },
      { status: error.response?.status || 400 }
    );
  }
}
