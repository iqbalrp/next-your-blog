import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST() {
  const cookieStore = await cookies()
  cookieStore.delete("token")       // HttpOnly
  cookieStore.delete("token_ui")    // Optional UI cookie

  return NextResponse.json({ message: "Logout success" })
}
