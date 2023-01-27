import { GetServerSideProps } from "next";

import { getServerCookies } from "@/lib/getServerCookies";
import { QueryClient, dehydrate } from "@tanstack/react-query";

import { useUserQuery } from "@/features/user/useUserQuery";
import { useWishlistsQuery } from "@/features/wishlists/useWishlistsQuery";
import { makeServerRequest } from "@/utils/makeServerRequest";

import { WishlistList } from "@/components/common/WishlistList";
import { PrimaryLayout } from "@/layouts/PrimaryLayout";

import { Page } from "@/types/page";

const IndexPage: Page = () => {
  const { user } = useUserQuery();

  const { wishlists, isLoading } = useWishlistsQuery();

  return (
    <div>
      <h1>Привет, {user?.username}!</h1>

      <WishlistList wishlists={wishlists} isLoading={isLoading} />
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
