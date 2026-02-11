

import type { Metadata } from "next";
import { Schibsted_Grotesk, Martian_Mono } from "next/font/google";
import LayoutBackground from "@/components/LayoutBackground";
import "./globals.css"


const SchibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-schibsted_grotesk",
  subsets: ["latin"],
});

const MartianMono = Martian_Mono({
  variable: "--font-martian_mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dev Event",
  description: "The Hub for every event You musn't miss",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${SchibstedGrotesk.variable} ${MartianMono.variable} antialiased min-h-screen  text-white`}
      style={{background:"#00009"}}>
        <LayoutBackground />
        <main>{children}</main>
      </body>
    </html>
  );
}
