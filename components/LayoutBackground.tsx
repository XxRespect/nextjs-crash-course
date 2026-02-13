"use client";

import LightRays from "@/components/LightRays";
import NavBar from "@/components/NavBar";

export default function LayoutBackground() {
  return (
    <>
      <NavBar />
      <div
        /* make the background cover the viewport at all times; fixed keeps it behind scrolling content */
        /* pointer-events: none prevents this element from capturing clicks */
        style={{
          position: 'fixed',
          inset: '0',
          zIndex: '0',
          pointerEvents: 'none'
        }}
        className="w-full h-full"
      >
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
    </>
  );
}
