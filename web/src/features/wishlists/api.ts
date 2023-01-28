import { $axios } from "@/lib/axios";

import { CreateWishlistData, Wishlist } from "@/types/wishlists";

export async function getUserWishlists() {
  const resp = await $axios.get<Wishlist[]>("/api/wishlists");

  return resp.data;
}

export async function createWishlist(data: CreateWishlistData) {
  const resp = await $axios.post<Wishlist>("/api/wishlists", data);

  return resp.data;
}
