"use client";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function LenisScroll() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      // gentle, consistent smoothing across devices
      duration: 1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: true, // enable on touch devices for consistent behavior
      touchMultiplier: 1.6,
      direction: "vertical",
      wheelMultiplier: 1,
      gestureOrientation: "vertical",
      normalizeWheel: true,
      lerp: 0.08,
    });

    // Connect Lenis to GSAP ScrollTrigger so ScrollTrigger uses Lenis' virtual scroll
    const scrollerElem = document.scrollingElement || document.body;
    ScrollTrigger.scrollerProxy(scrollerElem, {
      scrollTop(value) {
        if (arguments.length) {
          // delegate setting scroll to Lenis (immediate to avoid animation)
          lenis.scrollTo(value, { immediate: true, duration: 0 });
        }
        // return current scroll position from Lenis
        return typeof lenis.scroll === "number" ? lenis.scroll : 0;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
      pinType: document.body.style.transform ? "transform" : "fixed",
    });

    // Keep ScrollTrigger updated when Lenis scrolls and keep Lenis updated on refresh
    const onLenisScroll = () => ScrollTrigger.update();
    lenis.on && lenis.on("scroll", onLenisScroll);

    const onRefresh = () => lenis.update && lenis.update();
    ScrollTrigger.addEventListener && ScrollTrigger.addEventListener("refresh", onRefresh);

    // Expose for debugging if needed
    window.lenis = lenis;

    let rafId = 0;
    const onRaf = (time) => {
      lenis.raf(time);
      // sync GSAP's ScrollTrigger with Lenis' virtual scroll position
      ScrollTrigger.update();
      rafId = requestAnimationFrame(onRaf);
    };

    rafId = requestAnimationFrame(onRaf);

    // keep ScrollTrigger refreshed on resize
    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      // detach handlers and destroy Lenis
      lenis.off && lenis.off("scroll", onLenisScroll);
      ScrollTrigger.removeEventListener && ScrollTrigger.removeEventListener("refresh", onRefresh);
      lenis.destroy();
      try { delete window.lenis; } catch (e) { }
      window.removeEventListener("resize", handleResize);
      // final refresh to restore native scroll behavior
      ScrollTrigger.refresh();
    };
  }, []);

  return null;
}