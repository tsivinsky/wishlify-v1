import { useQuery } from "@tanstack/react-query";

import { getUserWishlists } from "./api";

export const useWishlistsQuery = () => {
  const { data: wishlists, ...stuff } = useQuery(["wishlists"], () =>
    getUserWishlists()
  );

  return {
    wishlists,
    ...stuff,
  };
};
