import { $axios } from "@/lib/axios";

import { AuthResponse, LoginData, RegisterData } from "@/types/auth";

export async function registerUser(data: RegisterData) {
  const resp = await $axios.post<AuthResponse>("/api/auth/register", data);

  return resp.data;
}

export async function loginUser(data: LoginData) {
  const resp = await $axios.post<AuthResponse>("/api/auth/login", data);

  return resp.data;
}

export async function logoutUser() {
  const resp = await $axios.get("/api/auth/logout");

  return resp.data;
}
