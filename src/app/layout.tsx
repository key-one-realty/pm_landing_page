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
      {/* Google Tag Manager */}
      <GoogleTagManager gtmId="GTM-WXPWNV38" /> {/* <-- Replace with your new GTM ID */}
      <body className="font-montserrat antialiased">
        <Provider>{children}</Provider>
        {/* The GTM <noscript> iframe is automatically added by this component */}
      </body>
    </html>
  );
}
