import { ParsedUrlQuery } from "querystring";

export const getQueryParam = (query: ParsedUrlQuery, name: string) => {
  let value = query[name];

  if (Array.isArray(value)) {
    value = value[0];
  }

  return value ?? null;
};
