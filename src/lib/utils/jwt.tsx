// lib/utils/jwt.ts
import { jwtDecode } from "jwt-decode"

export type DecodedToken = {
  email: string
  id: number
  iat: number
  exp: number
}

export const decodeToken = (token: string): DecodedToken | null => {
  try {
    return jwtDecode<DecodedToken>(token)
  } catch (err) {
    console.warn("Gagal decode JWT:", err)
    return null
  }
}
