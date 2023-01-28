import { Product } from "./products";
import { User } from "./user";

export type Wishlist = {
  id: number;
  name: string;
  displayName: string;
  private: boolean;
  products: Product[];
  user: User;
  userId: number;
  createdAt: string;
  updatedAt: string;
};

export type CreateWishlistData = Pick<Wishlist, "name" | "private">;
