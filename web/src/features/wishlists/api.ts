import { $axios } from "@/lib/axios";

import { Wishlist } from "@/types/wishlists";

export async function getUserWishlists() {
  const resp = await $axios.get<Wishlist[]>("/api/wishlists");

  return resp.data;
}
