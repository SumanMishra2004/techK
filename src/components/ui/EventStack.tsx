"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

// Ensure ScrollTrigger is registered
gsap.registerPlugin(ScrollTrigger);

interface CardData {
  id: number | string;
  image: string;
  title: string;
  description: string;
  coordinator: string | string[];
  fees: string;
  link: string;
  alt?: string;
}

interface StickyCard002Props {
  cards: CardData[];
  className?: string;
  containerClassName?: string;
  cardClassName?: string;
}

const StickyCard002 = ({
  cards,
  className,
  containerClassName,
  cardClassName,
}: StickyCard002Props) => {
  const container = useRef(null);
  const stickyCardsRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cardElements = cardRefs.current;
      const totalCards = cardElements.length;

      if (!cardElements[0] || !stickyCardsRef.current) return;

      // 1. Initial Set: First card visible, others pushed down
      gsap.set(cardElements[0], { y: "0%", scale: 1, rotation: 0, opacity: 1 });

      for (let i = 1; i < totalCards; i++) {
        if (!cardElements[i]) continue;
        gsap.set(cardElements[i], { y: "100%", scale: 1, rotation: 0, opacity: 1 });
      }

      // 2. Main Timeline
      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: stickyCardsRef.current,
          start: "top top",
          end: `+=${window.innerHeight * (totalCards - 1)}`,
          pin: true,
          scrub: 0.5,
          pinSpacing: true,
        },
      });

      // 3. Loop to create animations
      for (let i = 0; i < totalCards - 1; i++) {
        const currentCard = cardElements[i];
        const nextCard = cardElements[i + 1];
        const position = i;
        if (!currentCard || !nextCard) continue;

        // Animate current card shrinking and fading slightly
        scrollTimeline.to(
          currentCard,
          {
            scale: 0.9, // Less aggressive scaling for better mobile view
            rotation: -2, // Subtle rotation
            opacity: 0.5, // Fade out slightly to focus on new card
            // filter: "blur(2px)", // REMOVED: Blur causes significant performance lag
            duration: 1,
            ease: "none",
          },
          position
        );

        // Animate next card sliding up
        scrollTimeline.to(
          nextCard,
          {
            y: "0%",
            duration: 1,
            ease: "none",
          },
          position
        );
      }
    }, container);

    const resizeObserver = new ResizeObserver(() => {
      ScrollTrigger.refresh();
    });

    if (container.current) {
      resizeObserver.observe(container.current);
    }

    return () => {
      resizeObserver.disconnect();
      ctx.revert();
    };
  }, [cards]);

  return (
    <div className={cn("relative min-h-screen w-full", className)} ref={container}>
      <div
        ref={stickyCardsRef}
        className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden"
      >
        {/* Container: Controls the max width and centering */}
        <div
          className={cn(
            "relative h-[85vh] md:h-[90vh] w-full  px-4 sm:px-6 lg:mx-10 md:mx-6 mx-3",
            containerClassName
          )}
        >
          {cards.map((card, i) => (
            <div
              key={card.id}
              className={cn(
                "absolute inset-0 m-auto h-full w-full overflow-hidden rounded-2xl md:rounded-3xl border border-white/10 bg-neutral-900 shadow-2xl origin-top",
                cardClassName
              )}
              style={{
                zIndex: i + 1, // Ensure proper stacking order
                willChange: "transform, opacity", // OPTIMIZATION: Hint browser to promote layer
              }}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
            >
              {/* Image Background */}
              <div className="absolute inset-0 h-full w-full">
                <img
                  src={card.image}
                  alt={card.alt || card.title}
                  className="h-full w-full object-cover opacity-70 transition-transform duration-700 hover:scale-105"
                />
                {/* Gradient Overlay: Enhanced for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
              </div>

              {/* Text Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-8 md:p-12">
                <div className="w-full space-y-3 sm:space-y-4 md:space-y-6">
                  <h3
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter leading-[0.9]"
                    style={{ fontFamily: '"Gruth Shaded", sans-serif' }}
                  >
                    {card.title}
                  </h3>
                  
                  <p className="text-gray-300 text-sm sm:text-base md:text-lg line-clamp-3 md:line-clamp-4">
                    {card.description}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-8 pt-2 md:pt-4 text-sm md:text-base border-t border-white/20 mt-2">
                    <div className="flex flex-col">
                      <span className="text-blue-400 font-bold uppercase text-xs tracking-wider">
                        Coordinators
                      </span>
                      <span className="text-white font-medium">
                        {Array.isArray(card.coordinator)
                          ? card.coordinator.join(", ")
                          : card.coordinator}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-green-400 font-bold uppercase text-xs tracking-wider">
                        Fees
                      </span>
                      <span className="text-white font-medium">{card.fees}</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <a
                      href={card.link}
                      className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 sm:px-8 rounded-lg text-sm sm:text-base uppercase tracking-wide transition-all transform hover:translate-y-[-2px] hover:shadow-lg hover:shadow-blue-600/30"
                    >
                      Apply Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { StickyCard002 };