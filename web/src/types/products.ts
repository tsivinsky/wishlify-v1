import { Wishlist } from "./wishlists";

export type Product = {
  name: string;
  wishlist: Wishlist;
  createdAt: string;
  updatedAt: string;
};
