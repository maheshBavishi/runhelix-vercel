"use client";
import React from "react";
import { motion } from "framer-motion";
import styles from "./aiGeneratedProduct.module.scss";
import Link from "next/link";
import Playicon from "../../../../public/assets/icons/playicon";

const LightLogoIcon = "/assets/icons/light-logo.svg";
const BgLightImage = "/assets/images/bg-light.png";
const Listicon = "/assets/images/listicon.png";
const Icon1 = "/assets/icons/tiktok.svg";
const Icon2 = "/assets/icons/instagram.svg";
const Icon3 = "/assets/icons/youtube.svg";
const Icon4 = "/assets/icons/meta.svg";
const Icon5 = "/assets/icons/googleads.svg";

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

const iconItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

export default function AiGeneratedProduct() {
  return (
    <section className={styles.aiGeneratedProduct}>
      <div className="container-sm">
        <motion.div
          className={styles.title}
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 variants={fadeUp}>
            Create Stunning AI-generated Product Videos and Pictures
          </motion.h2>

          <div className={styles.bannerlistsmain}>
            <div className={styles.bannerlists}>
              <img
                src={Listicon}
                alt="Listicon"
                className={styles.bannerlisticon}
              />
              <p>
                VIDEOS: UGC · Ads · Promotional · Educational · Short-form ·
                Long-form
              </p>
            </div>
            <div className={styles.bannerlists}>
              <img
                src={Listicon}
                alt="Listicon"
                className={styles.bannerlisticon}
              />
              <p>IMAGES: Photoshoot · Lifestyle · Model · Infographic</p>
            </div>
          </div>

          <div className={styles.simplelinemain}>
            <div className={styles.simpleline}>
              <img src={Listicon} alt="Listicon" className={styles.listicon} />
              <p>Simple interface</p>
            </div>
            <div className={styles.simpleline}>
              <img src={Listicon} alt="Listicon" className={styles.listicon} />
              <p>Simple Pricing</p>
            </div>
            <div className={styles.simpleline}>
              <img src={Listicon} alt="Listicon" className={styles.listicon} />
              <p>Post, Test, Boost & Repeat</p>
            </div>
          </div>

          <div className={styles.perfectline}>
            <p>Perfect For E-Commerce Businesses & Agencies</p>
          </div>

          <div className={styles.postdirectly}>
            <p>Post Directly To</p>
            <div className={styles.socialiconsmain}>
              <Link href={"/"}>
                <img src={Icon1} alt="Icon1" />
              </Link>
              <Link href={"/"}>
                <img src={Icon2} alt="Icon2" />
              </Link>
              <Link href={"/"}>
                <img src={Icon3} alt="Icon3" />
              </Link>
              <Link href={"/"}>
                <img src={Icon4} alt="Icon4" />
              </Link>
              <Link href={"/"}>
                <img src={Icon5} alt="Icon5" />
              </Link>
            </div>
          </div>
          <div className={styles.btnflx}>
            <Link href={"/"} className={styles.runbtnmain}>
              <button className={styles.runbtn}>
                Run Helix
                <Playicon />
              </button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Banner Image */}
      <motion.div
        className={styles.bannerImage}
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        viewport={{ once: true }}
      >
        <img src={BgLightImage} alt="BgLightImage" />
      </motion.div>
    </section>
  );
}
