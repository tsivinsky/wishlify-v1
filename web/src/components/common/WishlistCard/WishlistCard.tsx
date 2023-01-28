import React from "react";

import Link from "next/link";

import { dayjs } from "@/lib/dayjs";
import clsx from "clsx";
import { LockSimple } from "phosphor-react";

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

  const formattedDate = dayjs(wishlist.createdAt).format("DD.MM.YYYY");

  return (
    <Link href={`/${user?.username}/${wishlist.displayName}`} passHref>
      <Panel
        as="a"
        className={clsx("w-full flex flex-col justify-between", className)}
        {...props}
      >
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg">{wishlist.name}</h3>
            {wishlist.private && (
              <span title="Закрытый вишлист">
                <LockSimple size={14} color="var(--color-orange)" />
              </span>
            )}
          </div>
        </div>
        <div>
          <span className="text-xs text-gray-700">{formattedDate}</span>
        </div>
      </Panel>
    </Link>
  );
};
