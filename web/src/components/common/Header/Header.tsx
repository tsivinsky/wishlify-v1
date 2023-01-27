import Link from "next/link";

import { useLogoutMutation } from "@/features/auth/useLogoutMutation";
import { useUserQuery } from "@/features/user/useUserQuery";

import { Button } from "@/components/ui/Button";

export const Header = () => {
  const { user } = useUserQuery();

  const logoutMutation = useLogoutMutation();

  return (
    <header className="h-header flex items-center">
      <div className="container mx-auto px-2 md:px-0 flex justify-between items-center w-full">
        <Link href="/">
          <h1 className="text-3xl font-semibold">Wishlify</h1>
        </Link>
        {user ? (
          <div>
            <Button onClick={() => logoutMutation.mutate()}>Выйти</Button>
          </div>
        ) : (
          <nav className="flex items-center gap-4">
            <Link href="/join">Зарегистрироваться</Link>
            <Link href="/signin">Войти</Link>
          </nav>
        )}
      </div>
    </header>
  );
};
