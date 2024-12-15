import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AccountProvider } from "@/components/provider/account.provider";
import { MetaMaskClientProvider } from "@/components/provider/meta-mask.provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blockchain im SCM",
  description: "IDPA Prototyp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AccountProvider>
          <MetaMaskClientProvider>{children}</MetaMaskClientProvider>
        </AccountProvider>
      </body>
    </html>
  );
}