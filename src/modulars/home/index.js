'use client'
import React, { useEffect } from "react";
import Herobanner from "./herobanner";
import SimplePricing from "./simplePricing";
import CreatorsLove from "./creatorsLove";
import ProductDataTable from "./productDataTable";
import IndustriesServiced from "./industriesServiced";
import AiGeneratedProduct from "./aiGeneratedProduct";
import GalleryView from "./galleryView";
import VideoGenerated from "./videoGenerated";
import Prompttooutput from "./PromptToOutput";
import Ugcads from "./ugcads";
import Helixblogs from "./helixblogs";
import AiUgc from "./aiUgc";

export default function HomePage() {
  useEffect(() => {
    // Prefer Lenis programmatic scroll when available (Lenis controls scrolling transform)
    let cancelled = false;
    const tryScrollToTop = (attempt = 0) => {
      if (cancelled) return;
      const lenis = window.lenis;
      if (lenis && typeof lenis.scrollTo === 'function') {
        // use Lenis's smooth scroll API
        lenis.scrollTo(0, { duration: 1.0 });
      } else if (attempt < 8) {
        // retry a few times while Lenis initializes
        setTimeout(() => tryScrollToTop(attempt + 1), 100);
      } else {
        // fallback to native smooth scroll
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    tryScrollToTop();
    return () => { cancelled = true; };
  }, []);
  return (
    <div>
      <Herobanner />
      <AiGeneratedProduct />
      <IndustriesServiced />
      <Prompttooutput />
      <GalleryView />
      <AiUgc />
      <VideoGenerated />

      {/* <ProductDataTable /> */}
      {/* <CreatorsLove /> */}
      {/* <Ugcads /> */}
      <SimplePricing />
      {/* <Helixblogs /> */}
    </div>
  );
}
