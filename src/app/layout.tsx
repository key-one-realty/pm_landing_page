import type { Metadata } from "next";
import "./globals.css";
import Provider from "./provider";
import { GoogleTagManager } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: "Key One",
  description: "Unlock Your Property's Full Income Potential",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId="GTM-W9NNJL9" />
      <body className={`font-montserrat antialiased`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
