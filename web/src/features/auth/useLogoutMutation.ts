import { useRouter } from "next/router";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useTokens } from "@/stores/useTokens";

import { logoutUser } from "./api";

export const useLogoutMutation = () => {
  const router = useRouter();

  const queryClient = useQueryClient();

  const { removeTokens } = useTokens();

  return useMutation(() => logoutUser(), {
    onSuccess: () => {
      removeTokens();
      queryClient.removeQueries();
      router.push("/signin");
    },
  });
};
