import { GetServerSidePropsContext } from "next";

export const getServerCookies = (ctx: GetServerSidePropsContext) => {
  const { accessToken, refreshToken } = ctx.req.cookies as {
    accessToken?: string;
    refreshToken?: string;
  };

  return {
    accessToken,
    refreshToken,
  };
};
