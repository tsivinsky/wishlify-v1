import { useMutation } from "@tanstack/react-query";

import { RegisterData } from "@/types/auth";

import { registerUser } from "./api";

export const useRegisterMutation = () => {
  return useMutation((data: RegisterData) => registerUser(data));
};
