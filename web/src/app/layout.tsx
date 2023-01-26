import "@/styles/app.css";

import { LayoutProps } from "@/types/next";

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html>
      <head></head>
      <body>{children}</body>
    </html>
  );
}
