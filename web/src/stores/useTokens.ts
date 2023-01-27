import { create } from "zustand";

import { AuthResponse } from "@/types/auth";

export type TokensStore = {
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (data: AuthResponse) => void;
  removeTokens: () => void;
};

export const useTokens = create<TokensStore>((set) => ({
  accessToken: null,
  refreshToken: null,
  setTokens: (data) => {
    set({ accessToken: data.accessToken, refreshToken: data.refreshToken });
  },
  removeTokens: () => {
    set({ accessToken: null, refreshToken: null });
  },
}));
