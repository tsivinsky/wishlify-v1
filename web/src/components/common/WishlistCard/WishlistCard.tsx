import React from "react";

import Link from "next/link";

import clsx from "clsx";

import { useUserQuery } from "@/features/user/useUserQuery";

import { Panel, PanelProps } from "@/components/ui/Panel";

import { Wishlist } from "@/types/wishlists";

export type WishlistCardProps = PanelProps & {
  wishlist: Wishlist;
};

export const WishlistCard: React.FC<WishlistCardProps> = ({
  wishlist,
  className,
  ...props
}) => {
  const { user } = useUserQuery();

  return (
    <Link href={`/${user?.username}/${wishlist.displayName}`} passHref>
      <Panel as="a" className={clsx("block w-full", className)} {...props}>
        <h3>{wishlist.name}</h3>
      </Panel>
    </Link>
  );
};
