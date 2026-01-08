"use client";
import React, { useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import styles from "./prompttooutput.module.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Playicon from "../../../../public/assets/icons/playicon";

gsap.registerPlugin(ScrollTrigger);

const parralaxcardsimg1 = "/assets/images/parralaxcardsimg1.webp";
const parralaxcardsimg2 = "/assets/images/parralaxcardsimg2.webp";
const parralaxcardsimg3 = "/assets/images/parralaxcardsimg3.webp";
const parralaxcardsimg4 = "/assets/images/parralaxcardsimg4.webp";
const parralaxcardsimg5 = "/assets/images/parralaxcardsimg5.webp";
const parralaxcardsimg6 = "/assets/images/parralaxcardsimg6.webp";
const parralaxcardsimg7 = "/assets/images/parralaxcardsimg7.webp";

const Model1 = "/assets/icons/chatgpt.svg";
const Model2 = "/assets/icons/gemini.svg";
const Model3 = "/assets/icons/runway.svg";
const Model4 = "/assets/icons/elevenlabs.svg";
const Model5 = "/assets/icons/kling.svg";
const Model6 = "/assets/icons/qwen.svg";

const Outputimage = "/assets/images/outputimage.png";
const WatchVideo = "/assets/video/watch-video.mp4";

export default function Prompttooutput() {
  const mainRef = useRef(null);
  const cardsRef = useRef([]);
  const bottomGrdRef = useRef(null);
  const rightBoxRef = useRef(null);
  // const leftBoxSecondRef = useRef(null);
  const leftBoxSecondInnerRef = useRef(null);
  const switcherInnerRef = useRef(null);
  const fromPromptRef = useRef(null);
  const toOutputRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isBoxActive, setIsBoxActive] = useState(false);

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  useLayoutEffect(() => {
    // Wait for images to load and ensure DOM is ready
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useLayoutEffect(() => {
    if (!isLoaded) return;

    // Set initial states before animation to prevent flashing
    gsap.set(bottomGrdRef.current, {
      y: "50%",
      force3D: true,
      willChange: "transform",
    });

    gsap.set(cardsRef.current, {
      y: "0vh",
      force3D: true,
      willChange: "transform",
    });

    // Pre-render ScrollTrigger calculations
    ScrollTrigger.refresh();

    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 1, // Increased slightly for smoother follow-through
          anticipatePin: 1,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
          preventOverlaps: true,
          refreshPriority: 1,
          normalizeScroll: true,
        },
      });

      // 1. Parallax cards slide up (Scrubbed smoothly)
      tl.to(
        cardsRef.current,
        {
          y: "-6vh",
          ease: "none",
          force3D: true,
          immediateRender: false,
        },
        0
      );

      // 2. Bottom grid slide up with optimized easing
      tl.to(
        bottomGrdRef.current,
        {
          y: "-10%",
          ease: "none",
          force3D: true,
          immediateRender: false, // Prevents initial render flash
        },
        0
      );

      // 3. Fade out cards with smoother transition
      tl.to(
        cardsRef.current,
        {
          opacity: 0,
          duration: 0.15, // Slightly longer for smoother fade
          ease: "power1.inOut",
        },
        ">+=0.25" // Slightly shorter gap
      );

      // 4. Width expansion
      tl.to(
        rightBoxRef.current,
        {
          width: "100%",
          duration: 0.15,
          ease: "power2.out",
        },
        "<"
      );

      // 5. Switcher and state trigger
      tl.to(
        {},
        {
          duration: 0.15,
          onStart: () => setIsBoxActive(true),
          onReverseComplete: () => setIsBoxActive(false),
        },
        "<"
      );

      // 6. Switcher animation
      tl.to(
        switcherInnerRef.current,
        {
          ease: "power2.inOut",
        },
        "<"
      );

      // Smooth scrubbed reveal for card 4 on scroll (no DOM structure change)
      const card4 = cardsRef.current[3];
      if (card4) {
        const spanEl = card4.querySelector("span");
        const textEl = card4.querySelector(".textblock");

        gsap.fromTo(
          spanEl,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: card4,
              start: "top 85%",
              end: "top 60%",
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );

        gsap.fromTo(
          textEl,
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: card4,
              start: "top 85%",
              end: "top 60%",
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      }
    }, mainRef);

    return () => {
      ctx.revert();
      // Clean up will-change on unmount
      gsap.set([bottomGrdRef.current, cardsRef.current], {
        clearProps: "willChange",
      });
    };
  }, [isLoaded]);

  return (
    <>
      <div
        id="work-flow"
        ref={mainRef}
        className={styles.prompttooutputmain}
        style={{ opacity: isLoaded ? 1 : 0, transition: "opacity 0.3s" }}
      >
        <div className="container-lg">
          <div className={styles.prompttooutputtopflx}>
            <h3
              ref={fromPromptRef}
              className={`${!isBoxActive ? styles.active : ""} ${styles.left}`}
            >
              From Prompt
            </h3>
            <div className={styles.switchermain}>
              <div className={styles.switcher}>
                <div
                  ref={switcherInnerRef}
                  className={`${styles.switcherinner} ${isBoxActive ? styles.active : ""
                    }`}
                ></div>
              </div>
            </div>
            <h3
              ref={toOutputRef}
              className={`${isBoxActive ? styles.active : ""} ${styles.right}`}
            >
              To Output
            </h3>
          </div>

          <div className={styles.title}>
            <h4>Helix Orchestration Layer</h4>
            <p>
              Watch as Helix's AI Agents bring your product videos & images
              alive
            </p>
          </div>

          <div className={styles.parralaxcards}>
            <div className={styles.innerparralaxcardswrapp}>
              <div
                ref={(el) => (cardsRef.current[0] = el)}
                className={styles.parralaxcardsimg1}
              >
                <span>Concept Agent</span>
                <div className={styles.textblock}>
                  <p>
                    Analyzes the Product DNA Graph to deeply understand the
                    product’s value proposition, target audience, and market
                    context. Based on this intelligence, it defines the core
                    concept, messaging angle, and strategic positioning for the
                    content.
                  </p>
                </div>
              </div>
              <div
                ref={(el) => (cardsRef.current[1] = el)}
                className={styles.parralaxcardsimg2}
              >
                <span>Script Agent</span>
                <div className={styles.textblock}>
                  <p>
                    Generates context-aware, platform-optimized scripts by
                    leveraging product intelligence, campaign objectives, and
                    tone guidelines. Ensures the narrative is concise, engaging,
                    and aligned with the defined concept and brand voice.
                  </p>
                </div>
              </div>
              <div
                ref={(el) => (cardsRef.current[2] = el)}
                className={styles.parralaxcardsimg3}
              >
                <span>Visual Director Agent</span>
                <div className={styles.textblock}>
                  <p>
                    Curates visual references, styles, and creative directions,
                    and defines motion parameters such as camera movement,
                    pacing, transitions, and visual continuity to ensure a
                    cohesive and compelling visual experience.
                  </p>
                </div>
              </div>
              <div
                ref={(el) => (cardsRef.current[3] = el)}
                className={styles.parralaxcardsimg4}
              >
                <span>Generation Agent</span>
                <div className={styles.textblock}>
                  <p>
                    Acts as the execution layer by interfacing with model
                    adapters and media generation engines. Translates scripts
                    and visual directives into final media assets (video, audio,
                    imagery) with optimized performance and consistency.
                  </p>
                </div>
              </div>
              <div
                ref={(el) => (cardsRef.current[4] = el)}
                className={styles.parralaxcardsimg5}
              >
                <span>QA Agent</span>
                <div className={styles.textblock}>
                  <p>
                    Performs automated and rule-based quality checks to validate
                    brand consistency, visual accuracy, audio clarity, timing,
                    and technical compliance. Identifies and flags deviations
                    before final output delivery.
                  </p>
                </div>
              </div>
              <div
                ref={(el) => (cardsRef.current[5] = el)}
                className={styles.parralaxcardsimg6}
              >
                <span>Generation Agent</span>
                <div className={styles.textblock}>
                  <p>
                    Acts as the execution layer by interfacing with model
                    adapters and media generation engines. Translates scripts
                    and visual directives into final media assets (video, audio,
                    imagery) with optimized performance and consistency.
                  </p>
                </div>
              </div>
              <div
                ref={(el) => (cardsRef.current[6] = el)}
                className={styles.parralaxcardsimg7}
              >
                <span>Performance Agent</span>
                <div className={styles.textblock}>
                  <p>
                    Continuously evaluates historical performance data and
                    engagement metrics to bias content generation toward proven
                    high-performing patterns. Feeds optimization insights back
                    into the system to improve future outputs and conversion
                    rates.
                  </p>
                </div>
              </div>
            </div>
            <div
              ref={bottomGrdRef}
              className={styles.prompttooutputbottomgrdmain}
            >
              <div className="container-md">
                <div className={styles.prompttooutputbottomgrd}>
                  <div className={styles.grditemsleft}>
                    <div className={styles.leftboxfirst}>
                      <div className={styles.boxheader}>
                        <span>PROMPT</span>
                      </div>
                      <div className={styles.boxbody}>
                        <p>
                          Create a cinematic promotional video in landscape for a modern smart IoT watch highlighting performance, health tracking, and everyday wear. Show the watch in dramatic lighting with smooth camera motion and close-up details of the display and sensors. Include brief lifestyle moments and minimal UI overlays for key features like heart rate, sleep, and notifications. Use a dark, premium cinematic look with music-driven pacing and end on a strong hero shot with a subtle light sweep.

                        </p>
                      </div>
                    </div>
                    {/* <div
                      ref={leftBoxSecondRef}
                      className={`${styles.leftboxsecond} ${
                        isBoxActive ? styles.active : ""
                      }`}
                    >
                      <div
                        ref={leftBoxSecondInnerRef}
                        className={`${styles.leftboxsecondbox} ${
                          isBoxActive ? styles.active : ""
                        }`}
                      >
                        <span>RUN</span>
                      </div>
                    </div> */}
                  </div>
                  <div className={styles.grditemsright}>
                    <div
                      ref={rightBoxRef}
                      className={`${styles.rightboxfirst} ${isBoxActive ? styles.active : ""
                        }`}
                    >
                      <div className={styles.boxheader}>
                        <span>OUTPUT</span>
                      </div>
                      <video src={WatchVideo} alt="WatchVideo" playsInline autoPlay muted loop></video>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className={styles.btnflx}>
            <a href="https://platform.runhelix.ai/auth" target="_blank">
              <button className={styles.runbtn}>
                Run Helix
                <Playicon />
              </button>
            </a>
          </div> */}
          <motion.div className={styles.modelslistmain} variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}>
            <motion.span variants={fadeUp}>Models:</motion.span>
            <div className={styles.modelsflx}>
              <motion.img variants={fadeUp} src={Model1} alt="Model1" />
              <motion.img variants={fadeUp} src={Model2} alt="Model2" />
              <motion.img variants={fadeUp} src={Model3} alt="Model3" />
              <motion.img variants={fadeUp} src={Model4} alt="Model4" />
              <motion.img variants={fadeUp} src={Model5} alt="Model5" />
              <motion.img variants={fadeUp} src={Model6} alt="Model6" />
            </div>
            <motion.span variants={fadeUp}>+ more</motion.span>
          </motion.div>
        </div>
      </div>
    </>
  );
}
