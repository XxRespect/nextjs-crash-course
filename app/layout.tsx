

import type { Metadata } from "next";
import { Schibsted_Grotesk, Martian_Mono } from "next/font/google";
import LightRays from "@/components/LightRays";
import NavBar from "@/components/NavBar";
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


        <div style={{ position: 'absolute',
          inset: '0',top: '0', zIndex: '1'
        }} className="min-h-screen ">
          <NavBar />
          <LightRays
            raysOrigin="top-center-offset"
            raysColor="#5dfeca"
            raysSpeed={0.5}
            lightSpread={0.9}
            rayLength={1.4}
            followMouse={true}
            mouseInfluence={0.02}
            noiseAmount={0}
            distortion={0}
            className="custom-rays"
            pulsating={false}
            fadeDistance={1}
            saturation={1}
          />
        </div>
        <main>{children}</main>
      </body>
    </html>
  );
}
