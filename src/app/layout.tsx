import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Poppins } from "next/font/google";
import { Toaster } from "@/components/ui/sonner"
import "./globals.css";

import UserStoreInitializer from "@/lib/store/userStoreInitializer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "600", "700"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Feed",
  description: "Feed — Your personalized social stream for real-time updates and connections.",
  keywords: ["social media", "feed", "real-time updates", "connect", "posts", "microblogging"],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${poppins.variable} ${geistSans.variable} ${geistMono.variable} antialiased dark`}
      >
        <UserStoreInitializer />
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
