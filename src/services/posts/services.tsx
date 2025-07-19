import { localApi } from "../api-local";

export interface Author {
  id: number;
  name: string;
  email: string;
}

export interface GetPost {
  id: number;
  title: string;
  content: string;
  tags: string[];
  imageUrl: string;
  author: Author;
  createdAt: string;
  likes: number;
  comments: number;
}

export interface GetResponse {
  data: GetPost[];
  total: number;
  page: number;
  lastPage: number;
}

export const getRecommendedPosts = async (
  page = 1,
  limit = 10
): Promise<GetResponse> => {
  const url = `/api/posts/recommended?limit=${limit}&page=${page}`;
  const response = await localApi.get(url);
  return response.data;
};

export const mostLikedPosts = async (
  page = 1,
  limit = 10
): Promise<GetResponse> => {
  const url = `/api/posts/most-liked?limit=${limit}&page=${page}`;
  // console.log("Client fetching:", url);

  const response = await localApi.get(url);
  return response.data;
};

export const searchPosts = async (query: string, page = 1, limit = 10) => {
  const url = `/api/posts/search`;
  console.log("Client fetching:", url);
  const response = await localApi.get(url, {
    params: { query, page, limit },
  });
  return response.data;
};

export interface CreatePostPayload {
  title: string;
  content: string;
  tags: string[];
  image: File;
}
export interface ResponseCreatePost {
  id: number;
  title: string;
  content: string;
  tags: string[];
  imageUrl: string;
  author: Author;
  createdAt: string;
  likes: number;
  comments: number;
}

export const createPost = async (
  payload: CreatePostPayload
): Promise<ResponseCreatePost> => {
  const formData = new FormData();
  formData.append("title", payload.title);
  formData.append("content", payload.content);
  formData.append("tags", payload.tags.join(","));
  formData.append("image", payload.image);

  // Debug form isi
  for (const [key, val] of formData.entries()) {
    console.log(`${key}:`, val);
  }

  const res = await fetch("/api/posts/create", {
    method: "POST",
    body: formData, // ⛔️ Jangan atur Content-Type secara manual
  });

  if (!res.ok) {
    const errorBody = await res.json();
    throw new Error(errorBody.message || "Gagal membuat post");
  }

  const data: ResponseCreatePost = await res.json();
  return data;
};

export type MyPostResponse = {
  data: Post[];
  total: number;
  page: number;
  lastPage: number;
};
export type Post = {
  id: number;
  title: string;
  content: string;
  tags: string[];
  imageUrl: string;
  author: {
    id: number;
    name: string;
    email: string;
  };
  createdAt: string;
  likes: number;
  comments: number;
};

export const myPosts = async (
  page = 1,
  limit = 10,
  token: string
): Promise<MyPostResponse> => {
  const url = `/api/posts/my-posts?limit=${limit}&page=${page}`;
  const { data } = await localApi.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const deletePost = async (
  postId: number,
  token: string
): Promise<{ success: boolean }> => {
  const res = await fetch(`/api/posts/${postId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  const text = await res.text();

  try {
    const payload = JSON.parse(text);
    if (!res.ok) throw new Error(payload.message || "Failed to delete post");
    return payload;
  } catch {
    throw new Error(text || "Invalid backend response");
  }
};
