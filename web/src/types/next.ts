import type { ReactNode } from "react";

export type LayoutProps<TParams = {}> = {
  children: ReactNode;
  params: TParams;
};

export type PageProps<TParams = {}, TSearchParams = {}> = {
  params: TParams;
  searchParams: TSearchParams;
};
