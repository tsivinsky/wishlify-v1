import React from "react";

import { Header, HeaderProps } from "@/components/common/Header";

import { LayoutProps } from "@/types/next";

export type PrimaryLayoutProps = LayoutProps & {
  headerProps?: HeaderProps;
};

export const PrimaryLayout: React.FC<PrimaryLayoutProps> = ({
  headerProps,
  children,
}) => {
  return (
    <>
      <Header {...headerProps} />
      <main className="min-h-screen-without-header container mx-auto px-2 md:px-0">
        {children}
      </main>
    </>
  );
};
