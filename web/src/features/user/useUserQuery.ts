import { useQuery } from "@tanstack/react-query";

import { useTokens } from "@/stores/useTokens";

import { getAuthenticatedUser } from "./api";

export const useUserQuery = () => {
  const { accessToken } = useTokens();

  const { data: user, ...stuff } = useQuery(
    ["user"],
    () => getAuthenticatedUser(),
    {
      enabled: !!accessToken,
    }
  );

  return {
    user,
    ...stuff,
  };
};
