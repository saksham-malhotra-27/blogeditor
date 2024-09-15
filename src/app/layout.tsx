import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {FloatingDockDemo} from '@/components/layout/Nav'
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "GoHard",
  description: "Blogs by Go Hard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark bg-zinc-950`}
      >
        <FloatingDockDemo/>
        {children}
      </body>
    </html>
  );
}
