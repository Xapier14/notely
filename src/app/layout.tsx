import "./globals.scss";
import "./theme.scss";
import type { Metadata } from "next";
import Head from "next/head";
import Script from "next/script";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Notely",
  description: "A note-taking app.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
      <Script src="theme.js" />
    </html>
  );
}
