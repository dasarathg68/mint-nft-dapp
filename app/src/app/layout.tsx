import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import { type ReactNode } from "react";
import { cookieToInitialState } from "wagmi";

import { getConfig } from "../wagmi";
import { Providers } from "./providers";
import "@rainbow-me/rainbowkit/styles.css";
import { NavBar } from "./components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NFT Club Membership",
  description: "Made with Wagmi",
};

export default function RootLayout(props: { children: ReactNode }) {
  const initialState = cookieToInitialState(
    getConfig(),
    headers().get("cookie")
  );
  return (
    <html lang="en" data-theme="cupcake">
      <body className={inter.className}>
        <Providers initialState={initialState}>
          <NavBar />

          {props.children}
        </Providers>
      </body>
    </html>
  );
}
