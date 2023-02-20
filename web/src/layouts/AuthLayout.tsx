import React from "react";

import { LayoutProps } from "@/types/next";

export const AuthLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-full flex flex-col justify-center items-center min-h-screen-without-header">
      {children}
    </div>
  );
};
