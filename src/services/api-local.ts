import axios from "axios";

const baseURL =
  typeof window !== "undefined"
    ? window.location.origin // client-side: gunakan origin browser saat ini
    : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}` // server-side saat di-deploy di Vercel
    : "http://localhost:3000"; // fallback saat dev lokal di server

export const localApi = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
