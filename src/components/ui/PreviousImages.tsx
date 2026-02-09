"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const images = [
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516216628859-9bccecab13ca?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1504198458649-3128b932f49e?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1494959764136-6be9eb3c261e?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8?q=80&w=800&auto=format&fit=crop",
];

const Skiper30 = () => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis();

    // Sync Lenis and GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // GSAP Context for React Cleanup
    const ctx = gsap.context(() => {
      const columns = gsap.utils.toArray<HTMLElement>(".parallax-column");
      
      // Define specific speeds for each column to match your original design
      // Original y transforms: [height * 2, height * 3.3, height * 1.25, height * 3]
      const speeds = [2, 3.3, 1.25, 3.5];

      columns.forEach((col, i) => {
        gsap.to(col, {
          y: () => window.innerHeight * speeds[i], // Functional value handles resize automatically
          ease: "none",
          scrollTrigger: {
            trigger: container.current,
            start: "top bottom", // Start when container top hits viewport bottom
            end: "bottom top",   // End when container bottom hits viewport top
            scrub: 0,            // Smooth scrubbing (0 is instant, 1 adds a little lag)
            invalidateOnRefresh: true, // Recalculate values on resize
          },
        });
      });
    }, container);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
      ctx.revert(); // Clean up GSAP animations
    };
  }, []);

  return (
    <main className="w-full ">
     
      <div
        ref={container}
        className="relative box-border flex h-[200vh] gap-[2vw] overflow-hidden  p-[2vw]"
      >
        <Column
          images={[images[0], images[1], images[2], images[3]]}
          className="-top-[45%]"
        />
        <Column
          images={[images[4], images[5], images[6], images[7]]}
          className="-top-[95%]"
        />
        <Column
          images={[images[8], images[9], images[10], images[11]]}
          className="-top-[45%]"
        />
        <Column
          images={[images[12], images[13], images[14], images[15]]}
          className="-top-[75%]"
        />
      </div>

    </main>
  );
};


type ColumnProps = {
  images: string[];
  className?: string;
};

const Column = ({ images, className }: ColumnProps) => {
  return (
    // Added 'parallax-column' class for GSAP targeting
    // Removed motion.div, using standard div
    <div
      className={`parallax-column relative flex h-full w-1/4 min-w-62.5 flex-col gap-[2vw] will-change-transform ${className}`}
    >
      {images.map((src, i) => (
        <div key={i} className="relative h-full w-full overflow-hidden rounded-md">
          <Image
            src={src}
            alt="Parallax Image"
            loading="lazy"
            fill
            className="h-full w-full object-cover pointer-events-none"
          />
        </div>
      ))}
    </div>
  );
};

export { Skiper30 };