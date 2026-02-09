import HeroSection from "@/components/Home/HeroSection";
import CloudLayer from "@/components/Home/CloudLayer";
import AboutSection from "@/components/Home/AboutSection";
import React from "react";
import Image from "next/image";
import { Fade } from "react-awesome-reveal";
import { StickyCard002 } from "@/components/ui/EventStack";
function HomePage() {

  const cardData = [
  {
    "id": 1,
    "image": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    "title": "Hackathon 2026",
    "description": "Join the ultimate 36-hour coding battle where innovation meets execution. Build real-world solutions and win massive prizes.",
    "coordinator": ["Alex Johnson", "Rohan Mehta"],
    "fees": "$20",
    "link": "#",
    "alt": "Team working together on laptops"
  },
  {
    "id": 2,
    "image": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    "title": "Code War",
    "description": "A competitive programming contest designed to test your algorithmic skills and problem-solving speed against the best.",
    "coordinator": ["Sarah Lee", "David Kim", "Priya Patel"],
    "fees": "Free",
    "link": "#",
    "alt": "Coding setup with multiple screens"
  },
  {
    "id": 3,
    "image": "https://images.unsplash.com/photo-1518770660439-4636190af475",
    "title": "AI Summit",
    "description": "Explore the future of Artificial Intelligence with industry leaders. Keynote speeches, workshops, and hands-on demos.",
    "coordinator": "Dr. Alan Grant",
    "fees": "$50",
    "link": "#",
    "alt": "Technology circuit board close-up"
  },
  {
    "id": 4,
    "image": "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    "title": "Startup Pitch",
    "description": "Have a billion-dollar idea? Pitch it to a panel of investors and venture capitalists. Your journey to unicorn status starts here.",
    "coordinator": ["Emily Chen", "Mark Zuckerberg"],
    "fees": "$30",
    "link": "#",
    "alt": "Startup team brainstorming ideas"
  },
  {
    "id": 5,
    "image": "https://images.unsplash.com/photo-1506784983877-45594efa4cbe",
    "title": "Robo Wars",
    "description": "Witness the clash of metal and code. Build your bot and battle for supremacy in the arena of destruction.",
    "coordinator": "Mike Tyson",
    "fees": "$15",
    "link": "#",
    "alt": "Developer working late at night"
  }
]

  return (
  
    <div className="w-full bg-white">
      {/* CONTAINER: 
          'relative' acts as the boundary. 
          The Hero will be sticky *only* within this div's height. 
      */}
      <div className="relative">
        
        {/* STICKY HERO: 
            'sticky top-0' keeps it at the top of the viewport.
            'h-screen' ensures it fills the view.
            'z-0' keeps it in the background.
        */}
        <div className="sticky top-0 h-screen w-full overflow-hidden z-0">
          <HeroSection />
        </div>

        {/* CLOUD LAYER: 
            'relative' and a higher 'z-index' allows it to slide OVER the Hero.
            We use 'mt-[-100vh]' if you want it to start *below* the Hero 
            and scroll up into view, or just let it flow naturally.
        */}
        <div className="relative z-50 w-full pointer-events-none">
          <CloudLayer />
        </div>
      </div>

      {/* CONTENT BELOW 
          Lowered z-index to 20 so it sits BEHIND the clouds that overflow
          pointer-events-auto ensures text is still selectable/interactive
      */}
      <div className="relative z-20 pointer-events-auto"> 
         <AboutSection />
      </div>

      {/* Cloud Image Separated */}
  {/* */}
<div className="relative w-full mt-20 py-20 flex flex-col items-center">
  <h2 className="text-4xl md:text-6xl text-black font-bold mb-10 uppercase tracking-widest text-center" style={{ fontFamily: '"Sketch Block", sans-serif' }}>
    <span className="text-blue-600">Event</span> List
  </h2>
  
  <div className="w-full">
     <StickyCard002 cards={cardData}/>
  </div>

  <div className="mt-20">
    <button className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-black/20 bg-gray-100 px-8 py-4 shadow-lg transition-all duration-300 hover:border-blue-500 hover:bg-white hover:shadow-xl">
      <span className="text-lg font-medium tracking-wide text-black transition-colors group-hover:text-blue-600">
        Show More Events
      </span>
      <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-black transition-transform duration-300 group-hover:rotate-45 group-hover:scale-110">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-5 w-5 text-white"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
        </svg>
      </div>
    </button>
  </div>
</div>
<div className="relative z-50 w-full pointer-events-none mt-20 overflow-x-hidden leading-none -mb-1">
  <div className="w-[125%] left-1/2 -translate-x-1/2 relative">
    
    <Fade triggerOnce direction="up" delay={200} duration={1000} className="block">
    <Image 
      src="/cloud/Frame 7.png" 
      alt="Cloud Decoration" 
      width={1200}
      height={400}
      className="w-full h-auto block" 
      priority // Recommended if this is a large decorative element
    />
    </Fade>
  </div>
</div> 
<div className="relative z-10 w-full pointer-events-none xl:-mt-80 2xl:-mt-86 lg:-mt-50 md:-mt-35 -mt-25 xl:pt-70 lg:pt-40 md:pt-25 pt-15 h-screen bg-black text-white text-center"> next section</div>
    </div>
  );
}

export default HomePage;