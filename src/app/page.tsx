import HeroSection from "@/components/Home/HeroSection";
import CloudLayer from "@/components/Home/CloudLayer";
import AboutSection from "@/components/Home/AboutSection";
import React from "react";
import Image from "next/image";
function HomePage() {
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
        <div className="relative z-30 w-full pointer-events-none">
          <CloudLayer />
        </div>
      </div>

      {/* CONTENT BELOW */}
      <div className="relative z-10 bg-white">
         <AboutSection />
      </div>

      {/* Cloud Image Separated */}
  <div className="relative z-10 w-full pointer-events-none mt-20 overflow-x-hidden">
  <div className="w-[125%] left-1/2 -translate-x-1/2 relative">
    {/* By making this container 125% wide, the Image inside (w-full) 
      naturally becomes taller, and the parent div will expand 
      to fit that new height. 
    */}
    <Image 
      src="/cloud/Frame 7.png" 
      alt="Cloud Decoration" 
      width={1200}
      height={400}
      className="w-full h-auto block" 
      priority // Recommended if this is a large decorative element
    />
  </div>
</div>
    </div>
  );
}

export default HomePage;