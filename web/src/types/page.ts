import type { ComponentType, ReactElement, ReactNode } from "react";

import type { NextPage } from "next";

export type Page<PageProps = {}> = NextPage<PageProps> & {
  getLayout?: (page: ReactElement) => ReactNode;
  layout?: ComponentType;
};
