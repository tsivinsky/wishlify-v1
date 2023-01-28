import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CreateWishlistData } from "@/types/wishlists";

import { createWishlist } from "./api";

export const useCreateWishlistMutation = () => {
  const queryClient = useQueryClient();

  return useMutation((data: CreateWishlistData) => createWishlist(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(["wishlists"]);
    },
  });
};
