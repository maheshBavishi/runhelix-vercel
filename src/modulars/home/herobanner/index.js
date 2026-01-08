"use client";
import React from "react";
import styles from "./herobanner.module.scss";
import HexagonalWaveBanner from "@/components/WaveBanner";
const BannerImage = "assets/images/banner-img.png";
const HelixImage = "assets/logo/helix.png";

export default function Herobanner() {
  return (
    <>
      <main className={styles.herobannermain}>
        <div className={styles.herobannerbg}>
          {/* <HexagonalWaveBanner /> */}
        </div>
        <div className={styles.herobanner}>
          <div className={styles.loginbutton}>
            <a href="https://platform.runhelix.ai/auth" target="_blank">
              <button>Login</button>
            </a>
          </div>
          <div className={styles.pageBanner}>
            <div className={styles.bannerImage}>
              <img
                className={styles.keyframeAnimation}
                src={BannerImage}
                alt="BannerImage"
              />
            </div>

            <div className="container">
              <div className={styles.spacing}>
                <div className={styles.centerText}>
                  <div className={styles.centerLogo}>
                    <img src={HelixImage} alt="HelixImage" />
                  </div>
                  <p>The DNA of Consumer Technology Product Storytelling</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
