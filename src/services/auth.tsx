import { api } from "./api"

export type LoginPayload = {
  email: string
  password: string
}

export type LoginResponse = {
  token: string
}
export type RegisterPayload = {
  name: string
  email: string
  password: string
}

export type RegisterResponse = {
  id: number
  email: string
}


export type User = {
  id: number
  name: string
  email: string
  avatarUrl: string | null
  headline: string | null
}

export type ChangePasswordPayload = {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export const loginUser = async (payload: LoginPayload): Promise<LoginResponse> => {
  const { data } = await api.post("/auth/login", payload)
  return data
}

export const registerUser = async (payload: RegisterPayload): Promise<RegisterResponse> => {
  const { data } = await api.post("/auth/register", payload)
  return data
}

export const fetchUserByEmail = async (email: string): Promise<User> => {
  const { data } = await api.get(`/users/by-email/${encodeURIComponent(email)}`)
  return data
}

export const changePassword = async (
  payload: ChangePasswordPayload,
  token: string
): Promise<{ success: boolean }> => {
  const { data } = await api.patch("/users/password", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return data
}

export type MyPostResponse = {
  data: Post[]
  total: number
  page: number
  lastPage: number
}

export type Post = {
  id: number
  title: string
  content: string
  tags: string[]
  imageUrl: string
  author: {
    id: number
    name: string
    email: string
  }
  createdAt: string
  likes: number
  comments: number
}

export const myPosts = async (
  token: string
): Promise<MyPostResponse> => {
  const { data } = await api.get("/posts/my-posts?limit=10&page=1", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return data
}