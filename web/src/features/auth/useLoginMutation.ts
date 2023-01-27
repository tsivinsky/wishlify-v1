import { useMutation } from "@tanstack/react-query";

import { LoginData } from "@/types/auth";

import { loginUser } from "./api";

export const useLoginMutation = () => {
  return useMutation((data: LoginData) => loginUser(data));
};
