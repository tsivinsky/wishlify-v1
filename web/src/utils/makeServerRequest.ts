import Axios, { AxiosRequestConfig } from "axios";

const _axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

export const makeServerRequest = async <TData = any>(
  url: string,
  accessToken?: string
) => {
  const config: AxiosRequestConfig = {};

  if (accessToken) {
    config.headers = {
      Authorization: `Bearer ${accessToken}`,
    };
  }

  const resp = await _axios.get<TData>(url, config);

  return resp.data;
};
