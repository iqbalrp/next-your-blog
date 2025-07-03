import { localApi } from "./api-local"

export type LoginPayload = {
  email: string
  password: string
}

export type LoginResponse = {
  token: string
}

export const loginUser = async (payload: LoginPayload): Promise<LoginResponse> => {
  const { data } = await localApi.post("/api/login", payload)
  return data
}
// export const loginUser = async (payload: LoginPayload): Promise<LoginResponse> => {
//   const { data } = await api.post("/auth/login", payload)
//   return data
// }