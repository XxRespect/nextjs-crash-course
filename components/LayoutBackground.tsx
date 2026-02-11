"use client";

import LightRays from "@/components/LightRays";
import NavBar from "@/components/NavBar";

export default function LayoutBackground() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: '0',
        top: '0',
        zIndex: '1'
      }}
      className="min-h-screen"
    >
      <NavBar />
      <LightRays
        raysOrigin="top-center-offset"
        raysColor="#5dfeca"
        raysSpeed={0.2}
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
  );
}
