import type { ReactNode } from "react";

export type LayoutProps<TProps = {}> = TProps & {
  children: ReactNode;
};
