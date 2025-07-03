import { api } from "../api";
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
  title: string
  content: string
  tags: string[]         
  image: File            
}
export interface ResponseCreatePost {
  id: number
  title: string
  content: string
  tags: string[]
  imageUrl: string
  author: Author
  createdAt: string
  likes: number
  comments: number
}
export const createPost = async (
  payload: CreatePostPayload
): Promise<ResponseCreatePost> => {
  const formData = new FormData()
  formData.append("title", payload.title)
  formData.append("content", payload.content)
  formData.append("tags", payload.tags.join(","))
  formData.append("image", payload.image)

  const { data } = await localApi.post<ResponseCreatePost>(
    "/api/posts/create",
    formData
  )

  return data
}

