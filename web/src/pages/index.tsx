import { GetServerSideProps } from "next";

import { createAxios } from "@/lib/axios";
import { getServerCookies } from "@/lib/getServerCookies";
import { QueryClient, dehydrate } from "@tanstack/react-query";

import { useUserQuery } from "@/features/user/useUserQuery";

import { PrimaryLayout } from "@/layouts/PrimaryLayout";

import { Page } from "@/types/page";

const IndexPage: Page = () => {
  const { user } = useUserQuery();

  return (
    <div>
      <h1>Hello, {user?.username}!</h1>
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

  await queryClient.prefetchQuery(
    ["user"],
    async () => (await createAxios(accessToken).get("/api/user")).data
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
