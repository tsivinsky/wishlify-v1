import React from "react";

import { Header } from "@/components/common/Header";

import { LayoutProps } from "@/types/next";

export const PrimaryLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="min-h-screen-without-header container mx-auto px-2 md:px-0">
        {children}
      </main>
    </>
  );
};
