import React from "react";

import Link from "next/link";

import { useLogoutMutation } from "@/features/auth/useLogoutMutation";
import { useUserQuery } from "@/features/user/useUserQuery";

import { Button } from "@/components/ui/Button";

export type HeaderProps = {
  withUserMenu?: boolean;
};

export const Header: React.FC<HeaderProps> = ({ withUserMenu = true }) => {
  const { user } = useUserQuery();

  const logoutMutation = useLogoutMutation();

  return (
    <header className="h-header flex items-center">
      <div className="max-w-[1640px] mx-auto px-2 md:px-0 flex justify-between items-center w-full">
        <Link href="/">
          <h1 className="text-3xl font-semibold">Wishlify</h1>
        </Link>
        {withUserMenu &&
          (user ? (
            <div>
              <Button onClick={() => logoutMutation.mutate()}>Выйти</Button>
            </div>
          ) : (
            <nav className="flex items-center gap-4">
              <Link href="/join">Зарегистрироваться</Link>
              <Link href="/signin">Войти</Link>
            </nav>
          ))}
      </div>
    </header>
  );
};
