"use client";
import React from "react";
import { motion } from "framer-motion";
import styles from "./videoGenerated.module.scss";
const Video = "/assets/video/video.mp4";
export default function VideoGenerated() {
  return (
    <div className={styles.videoGenerated}>
      <div className="container-xs">
        <motion.div
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2>Runhelix Create.</h2>
        </motion.div>
        {/* Assembling molecular storytelling strands. */}
        {/* Enjoy a snack — Helix is now running. */}
        <div className={styles.videobox}>
          <video src={Video} alt="Video" playsInline autoPlay muted loop></video>
          <div className={styles.details}>
            <p>
              Older man in the hot sun on a golfcourse with friends and a bottle
              of PeptiPROTECT
            </p>
          </div>
        </div>
        <div className={styles.twobutton}>
          <a href="https://platform.runhelix.ai/auth" target="_blank">
            <button className={styles.fillbutton}>Image</button>
          </a>
          <a href="https://platform.runhelix.ai/auth" target="_blank">
            <button className={styles.outline}>Video</button>
          </a>
        </div>
        <div className={styles.lightbox}>
          <div className={styles.chatbottombar}>
            <textarea placeholder="Simply enter your work email here to create your first free video"></textarea>
            <div className={styles.buttonAlignment}>
              <a href="https://platform.runhelix.ai/auth" target="_blank">
                <button className={styles.fillbutton}>Select Product</button>
              </a>
              <div className={styles.rightAlignment}>
                <a href="https://platform.runhelix.ai/auth" target="_blank">
                  <button>UGC</button>
                </a>
                <a href="https://platform.runhelix.ai/auth" target="_blank">
                  <button>portrait</button>
                </a>
                <a href="https://platform.runhelix.ai/auth" target="_blank">
                  <button>
                    Run Helix
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.82896 3.39688C5.20616 2.46603 3.8905 3.2286 3.8905 5.09877V18.8998C3.8905 20.7719 5.20616 21.5335 6.82896 20.6035L18.8918 13.6855C20.5151 12.7543 20.5151 11.2457 18.8918 10.3147L6.82896 3.39688Z"
                        fill="#29A6B4"
                      ></path>
                    </svg>
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
