import Axios from "axios";

import { useTokens } from "@/stores/useTokens";

export const $axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

$axios.interceptors.request.use(
  (config) => {
    const { accessToken } = useTokens.getState();
    if (!accessToken) {
      return config;
    }

    Object.assign(config.headers, {
      Authorization: `Bearer ${accessToken}`,
    });

    return config;
  },
  (error) => {
    throw error;
  }
);
