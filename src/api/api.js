import axios from "axios";

// Swagger: https://api.escuelajs.co/docs
export const api = axios.create({
  baseURL: "https://api.escuelajs.co/api/v1",
});

// Har bir so'rovga token qo'shamiz (login qilingan bo'lsa)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
