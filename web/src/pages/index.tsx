import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";

import { getServerCookies } from "@/lib/getServerCookies";
import { QueryClient, dehydrate } from "@tanstack/react-query";

import { useUserQuery } from "@/features/user/useUserQuery";
import { useWishlistsQuery } from "@/features/wishlists/useWishlistsQuery";
import { makeServerRequest } from "@/utils/makeServerRequest";

import { WishlistList } from "@/components/common/WishlistList";
import { Button } from "@/components/ui/Button";
import { PrimaryLayout } from "@/layouts/PrimaryLayout";

import { Page } from "@/types/page";

const IndexPage: Page = () => {
  const { user } = useUserQuery();

  const { wishlists, isLoading } = useWishlistsQuery();

  return (
    <div>
      <Head>
        <title>Главная</title>
      </Head>

      <div className="flex justify-between items-center gap-2 flex-wrap mb-6">
        <h1 className="text-xl font-medium">Привет, {user?.username}!</h1>
        <Link href="/new" passHref>
          <Button className="w-full sm:w-auto block">Создать вишлист</Button>
        </Link>
      </div>

      <div>
        <h2 className="mb-2 border-b">Ваши вишлисты</h2>
        <WishlistList wishlists={wishlists} isLoading={isLoading} />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { accessToken, refreshToken } = getServerCookies(ctx);

  if (!accessToken || !refreshToken) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["user"], () =>
    makeServerRequest("/api/user", accessToken)
  );

  return {
    props: {
      accessToken,
      refreshToken,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

IndexPage.getLayout = (page) => <PrimaryLayout>{page}</PrimaryLayout>;

export default IndexPage;
