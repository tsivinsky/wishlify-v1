import { useRouter } from "next/router";

import { useMutation } from "@tanstack/react-query";

import { useTokens } from "@/stores/useTokens";

import { logoutUser } from "./api";

export const useLogoutMutation = () => {
  const router = useRouter();

  const { removeTokens } = useTokens();

  return useMutation(() => logoutUser(), {
    onSuccess: () => {
      removeTokens();
      router.push("/signin");
    },
  });
};
