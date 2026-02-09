"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setComplete(true),
      });

      // Animate text
      tl.fromTo(
        textRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      )
      .to(textRef.current, {
        opacity: 0,
        y: -50,
        duration: 0.8,
        ease: "power3.in",
        delay: 0.5,
      })
      // Slide up curtain
      .to(containerRef.current, {
        yPercent: -100,
        duration: 1.2,
        ease: "power2.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  if (complete) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-9999 flex items-center justify-center bg-black text-white"
    >
      <div ref={textRef} className="text-4xl md:text-6xl font-bold tracking-widest uppercase">
        Loading...
      </div>
    </div>
  );
}
