"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface CrowdCanvasProps {
  src?: string;
  rows?: number;
  cols?: number;
}

// ---------- UTILS ----------
const randomRange = (min: number, max: number) =>
  min + Math.random() * (max - min);

const randomIndex = <T,>(array: T[]) => randomRange(0, array.length) | 0;

const removeFromArray = <T,>(array: T[], i: number): T => array.splice(i, 1)[0];

const removeItemFromArray = <T,>(array: T[], item: T): T =>
  removeFromArray(array, array.indexOf(item));

const removeRandomFromArray = <T,>(array: T[]): T =>
  removeFromArray(array, randomIndex(array));

const getRandomFromArray = <T,>(array: T[]): T => array[randomIndex(array)];

// ---------- TYPES ----------
type Rect = [number, number, number, number];

interface Peep {
  image: HTMLImageElement;
  rect: Rect;
  width: number;
  height: number;
  drawArgs: [
    HTMLImageElement,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
  ];
  x: number;
  y: number;
  anchorY: number;
  scaleX: number;
  walk: gsap.core.Timeline | null;
  setRect: (rect: Rect) => void;
  render: (ctx: CanvasRenderingContext2D) => void;
}

// ---------- FACTORY FUNCTION ----------
const createPeep = ({
  image,
  rect,
}: {
  image: HTMLImageElement;
  rect: Rect;
}): Peep => {
  const peep: Peep = {
    image,
    rect: [0, 0, 0, 0],
    width: 0,
    height: 0,
    drawArgs: [new Image(), 0, 0, 0, 0, 0, 0, 0, 0],
    x: 0,
    y: 0,
    anchorY: 0,
    scaleX: 1,
    walk: null,
    setRect: (rect: Rect) => {
      peep.rect = rect;
      peep.width = rect[2];
      peep.height = rect[3];
      peep.drawArgs = [peep.image, ...rect, 0, 0, peep.width, peep.height];
    },
    render: (ctx: CanvasRenderingContext2D) => {
      ctx.save();
      ctx.translate(peep.x, peep.y);
      ctx.scale(peep.scaleX, 1);
      ctx.drawImage(
        peep.image,
        peep.rect[0],
        peep.rect[1],
        peep.rect[2],
        peep.rect[3],
        0,
        0,
        peep.width,
        peep.height,
      );
      ctx.restore();
    },
  };

  peep.setRect(rect);
  return peep;
};

// ---------- COMPONENT ----------
export const CrowdCanvas = ({
  src = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/175711/open-peeps-sheet.png",
  rows = 15, // Increased from 15 for more people
  cols = 7, // Increased from 7 for more people
}: CrowdCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();

    const stage = { width: 0, height: 0 };
    const allPeeps: Peep[] = [];
    const availablePeeps: Peep[] = [];
    const crowd: Peep[] = [];

    // Scroll state
    const scrollState = {
      lastY: 0,
      currentY: 0,
      velocity: 0,
      smoothedVelocity: 0,
    };

    // ----- WALK LOGIC -----
    const resetPeep = (peep: Peep) => {
      const direction = Math.random() > 0.5 ? 1 : -1;
      
      const offsetY = 100 - 250 * gsap.parseEase("power2.in")(Math.random());
      const startY = stage.height - peep.height + offsetY;

      let startX: number, endX: number;

      if (direction === 1) {
        startX = -peep.width;
        endX = stage.width;
        peep.scaleX = 1;
      } else {
        startX = stage.width + peep.width;
        endX = 0;
        peep.scaleX = -1;
      }

      peep.x = startX;
      peep.y = startY;
      peep.anchorY = startY;

      return { startX, startY, endX };
    };

    const normalWalk = (peep: Peep) => {
      const { startY, endX } = resetPeep(peep);
      const xDuration = 10;
      const yDuration = 0.25;

      const tl = gsap.timeline();
      // Base random speed variation
      tl.data = { baseSpeed: randomRange(0.5, 1.5) }; 
      tl.timeScale(0); // Start paused until scroll happens

      tl.to(peep, { duration: xDuration, x: endX, ease: "none" }, 0);
      tl.to(
        peep,
        {
          duration: yDuration,
          repeat: xDuration / yDuration,
          yoyo: true,
          y: startY - 10,
        },
        0,
      );

      return tl;
    };

    const walks = [normalWalk];

    // ----- SETUP -----
    const createPeeps = () => {
      const { naturalWidth: width, naturalHeight: height } = img;
      const total = rows * cols;
      const rectWidth = width / rows;
      const rectHeight = height / cols;

      for (let i = 0; i < total; i++) {
        allPeeps.push(
          createPeep({
            image: img,
            rect: [
              (i % rows) * rectWidth,
              ((i / rows) | 0) * rectHeight,
              rectWidth,
              rectHeight,
            ],
          }),
        );
      }
    };

    const resize = () => {
      stage.width = canvas.clientWidth;
      stage.height = canvas.clientHeight;

      canvas.width = stage.width * devicePixelRatio;
      canvas.height = stage.height * devicePixelRatio;

      crowd.forEach((p) => p.walk?.kill());
      crowd.length = 0;
      availablePeeps.length = 0;
      availablePeeps.push(...allPeeps);
      
      // Do NOT initCrowd here, we start empty
    };

    const addPeepToCrowd = () => {
      if (availablePeeps.length === 0) return;
      const peep = removeRandomFromArray(availablePeeps);
      const walk = getRandomFromArray(walks)(peep).eventCallback(
        "onComplete",
        () => {
          removePeepFromCrowd(peep);
          // Don't auto-read here, let the loop handle it
        },
      );

      peep.walk = walk;
      crowd.push(peep);
      crowd.sort((a, b) => a.anchorY - b.anchorY);
      return peep;
    };

    const removePeepFromCrowd = (peep: Peep) => {
      removeItemFromArray(crowd, peep);
      availablePeeps.push(peep);
      peep.walk?.kill();
    };

    const render = () => {
      // 1. Calculate Scroll Physics
      scrollState.currentY = window.scrollY;
      const delta = Math.abs(scrollState.currentY - scrollState.lastY);
      
      // Decay smoothed velocity (friction) but bump it with current delta
      // Lowering friction to 0.05 to create an "ease-in" / inertia effect for walking
      scrollState.smoothedVelocity += (delta - scrollState.smoothedVelocity) * 0.1;
      scrollState.lastY = scrollState.currentY;

      // 2. Determine Crowd Size based on Scroll Position (Gradual entry)
      // e.g., 1 peep per 20px scrolled, maxed at allPeeps
      // Decreased divisor to 15 (was 50) to fill population faster as requested
      const targetPopulation = Math.floor(scrollState.currentY / 8); 
      const clampedPopulation = Math.min(targetPopulation, allPeeps.length);

      // 3. Manage Population
      if (crowd.length < clampedPopulation) {
        // Add random chance to add (staggering)
        if (Math.random() > 0.5) addPeepToCrowd();
      } else if (crowd.length > clampedPopulation) {
        const peepToRemove = crowd[0]; // Simple remove first
        if (peepToRemove) removePeepFromCrowd(peepToRemove);
      }

      // 4. Update Animation Speeds
      // Speed factor: 0 when still, increases with scroll speed.
      // We amp up the velocity a bit to make them walk reasonably fast when scrolling.
      // Increased multiplier from 0.2 to 0.6 to make them travel further per scroll
      const speedFactor = scrollState.smoothedVelocity * 0.4; 
      
      crowd.forEach((p) => {
         if (p.walk) {
            // baseSpeed ensures variety. speedFactor applies user input.
            // + 0.05 to give a tiny bit of "life" or idle movement? 
            // User said "speed depends on scroll speed". If 0, they should stop.
            const targetTimeScale = p.walk.data.baseSpeed * speedFactor;
            p.walk.timeScale(targetTimeScale);
         }
      });

      // 5. Draw
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(devicePixelRatio, devicePixelRatio);
      crowd.forEach((p) => p.render(ctx));
      ctx.restore();
    };

    const init = () => {
      createPeeps();
      resize();
      scrollState.lastY = window.scrollY; // Init scroll pos
      gsap.ticker.add(render);
    };

    img.onload = init;
    img.src = src;

    const handleResize = () => resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      gsap.ticker.remove(render);
      crowd.forEach((peep) => {
        if (peep.walk) peep.walk.kill();
      });
    };
  }, [src, rows, cols]);

  // FIX: Changed bottom-0 to -bottom-10 to push it down
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute h-full w-full" 
    />
  );
};

// ---------- DEFAULT EXPORT ----------
export default function PeepsCanvas() {
  return (
    <div className="absolute z-1 h-screen w-full overflow-hidden">
      <CrowdCanvas />
    </div>
  );
}