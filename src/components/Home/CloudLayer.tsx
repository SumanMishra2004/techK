"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CloudStack = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cloudRefs = useRef<HTMLDivElement[]>([]);

  // 1. EXACTLY 8 CLOUDS
  // Spaced out from top (0%) to bottom (95%)
  const cloudLayers = useMemo(
    () => [
      // Top Section
      { id: 1, top: 0, zIndex: 10, speed: 0.2 }, // Background (Slow)
      { id: 2, top: 5, zIndex: 50, speed: 1.5 }, // Foreground (Fast)

      // Middle Section
      { id: 3, top: 10, zIndex: 20, speed: 0.4 },
      { id: 4, top: 15, zIndex: 40, speed: 1.2 },
      { id: 5, top: 20, zIndex: 15, speed: 0.3 },

      // Bottom Section
      { id: 6, top: 30, zIndex: 35, speed: 1.8 },
      { id: 7, top: 40, zIndex: 25, speed: 0.8 },
      { id: 8, top: 45, zIndex: 60, speed: 2.5 }, // Very fast bottom cloud
    ],
    []
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      cloudRefs.current.forEach((cloud, i) => {
        if (!cloud) return;

        const layer = cloudLayers[i];
        const movementY = 50 * layer.speed; 

        gsap.fromTo(
          cloud,
          { yPercent: movementY }, 
          {
            yPercent: 0, 
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom center",
              scrub: 1, 
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [cloudLayers]);

  return (
    <div 
      ref={containerRef} 
      // Height: 100vh on mobile, taller on desktop
      className="relative w-full h-screen md:h-[150vh]  py-10 overflow-x-clip overflow-y-visible pointer-events-none"
    >
      {cloudLayers.map((layer, index) => (
        <div
          key={layer.id}
          ref={(el) => {
            if (el) cloudRefs.current[index] = el;
          }}
          className="absolute w-full h-full flex justify-center"
          style={{
            zIndex: layer.zIndex,
            top: `${layer.top}%`, 
            left: 0, 
            willChange: "transform", // Performance optimization
          }}
        >
          {/* 2. SCALE UPDATE:
              scale-[2.0] -> Mobile (Was 3.0, slightly reduced efficiently for overflow)
              md:scale-[1.5] -> Tablet
              lg:scale-[1.2] -> Desktop 
              origin-center -> keeps scaling balanced
          */}
          <div className="relative w-full h-full transition-transform duration-300 origin-center
                          scale-[2.0] md:scale-[1.5] lg:scale-[1.2]">
            <Image
              src="/cloud/image.png"
              alt={`Cloud layer ${layer.id}`}
              fill
              className="object-contain" // Changed to contain to avoid cutting
              priority={index < 3} // Only prioritize top 3 images
              sizes="(max-width: 768px) 200vw, (max-width: 1200px) 150vw, 100vw"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CloudStack;