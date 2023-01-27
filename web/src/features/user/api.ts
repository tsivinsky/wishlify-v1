import { $axios } from "@/lib/axios";

import { User } from "@/types/user";

export async function getAuthenticatedUser() {
  const resp = await $axios.get<User>("/api/user");

  return resp.data;
}
