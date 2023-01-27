import React from "react";

import clsx from "clsx";

import { Loader } from "@/components/ui/Loader";

import { Wishlist } from "@/types/wishlists";

import { WishlistCard } from "../WishlistCard";

export type WishlistListProps = JSX.IntrinsicElements["div"] & {
  wishlists: Wishlist[] | undefined;
  isLoading: boolean;
};

export const WishlistList: React.FC<WishlistListProps> = ({
  wishlists,
  isLoading,
  className,
  ...props
}) => {
  return (
    <div
      className={clsx(
        "grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4",
        className
      )}
      {...props}
    >
      {wishlists ? (
        wishlists.map((wishlist) => (
          <WishlistCard key={wishlist.id} wishlist={wishlist} />
        ))
      ) : (
        <Loader loading={isLoading} />
      )}
    </div>
  );
};
