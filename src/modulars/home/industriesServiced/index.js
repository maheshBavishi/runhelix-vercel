"use client";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import styles from "./industriesServiced.module.scss";

const changerimg1 = "/assets/images/25.jpeg";
const changerimg2 = "/assets/images/26.jpg";
const changerimg3 = "/assets/images/19.png";
const changerimg4 = "/assets/images/17.jpg";
const changerimg5 = "/assets/images/23.png";
const changerimg6 = "/assets/images/16.png";
const changerimg7 = "/assets/images/5.jpg";
const changerimg8 = "/assets/images/9.jpg";
const changerimg9 = "/assets/images/23.png";
const changerimg10 = "/assets/images/4.png";

const industries = [
  { label: "Smart Home Tech", image: changerimg6 },
  { label: "Mobility & Vehicle Tech", image: changerimg1 },
  { label: "Smart Apparel & Fashion Tech", image: changerimg2 },
  { label: "Food & Beverage Tech", image: changerimg3 },
  { label: "Productivity & Workspace Tech", image: changerimg4 },
  { label: "Security & Surveillance Tech", image: changerimg5 },
  { label: "Health & Wellness Tech", image: changerimg7 },
  { label: "Beauty & AI Skincare Tech", image: changerimg8 },
  { label: "IoT & Connected Tech", image: changerimg9 },
  { label: "Connected Camera & Video Tech", image: changerimg10 },
];

export default function IndustriesServiced() {
  const [activeIndustry, setActiveIndustry] = useState(industries[0]);
  const imageSwiperRef = useRef(null);
  const buttonSwiperRef = useRef(null);

  return (
    <section className={styles.industriesServiced} id="industries">
      <div className="container-sm">
        {/* Title Animation */}
        <motion.div
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2>Consumer Technology Industries Serviced</h2>
          <p>
            Instantly Create Stunning AI-Generated Product Videos & Images For
            Your:
          </p>
        </motion.div>

        <div className={styles.imagewrapperrelative}>
          <div className={styles.imagewrapperabsolute}>
            {/* <AnimatePresence mode="wait"> */}
            {/* <motion.img
                key={activeIndustry?.label || "default"}
                src={activeIndustry?.image || changerimg1}
                alt={activeIndustry?.label || "Industry"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                // transition={{ duration: 0.4, ease: "easeInOut" }}
              /> */}
            {/* </AnimatePresence> */}
            {industries.map((item, index) => (
              <img
                src={item.image}
                alt={item.label}
                key={index}
                className={`${activeIndustry?.label === item.label ? styles.active : ""
                  }`}
              />
            ))}
          </div>
          <div className={styles.flex}>
            {/* Left Column */}
            <div className={styles.flexitems}>
              {industries.slice(0, 5).map((industry, index) => (
                <div
                  key={industry.label}
                  className={`${index % 2 === 0 ? styles.itemright : styles.itemleft
                    }`}
                >
                  <div
                    className={`${styles.btn} ${activeIndustry?.label === industry.label
                      ? styles.active
                      : ""
                      }`}
                    onMouseEnter={() => setActiveIndustry(industry)}
                    onMouseLeave={() => setActiveIndustry(industries[0])}
                  >
                    <button type="button">{industry.label}</button>
                  </div>
                </div>
              ))}
            </div>
            {/* Right Column */}
            <div className={styles.flexitems}>
              {industries.slice(5).map((industry, index) => (
                <div
                  key={industry.label}
                  className={`${index % 2 !== 0 ? styles.itemright : styles.itemleft
                    }`}
                >
                  <div
                    className={`${styles.btn} ${activeIndustry?.label === industry.label
                      ? styles.active
                      : ""
                      }`}
                    onMouseEnter={() => setActiveIndustry(industry)}
                    onMouseLeave={() => setActiveIndustry(industries[0])}
                  >
                    <button type="button">{industry.label}</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.slidermobilemain}>
          <div className={styles.sliderimagebox}>
            <Swiper
              loop={true}
              onSwiper={(swiper) => (imageSwiperRef.current = swiper)}
              onSlideChange={(swiper) => {
                const realIndex = swiper.realIndex;
                const syncedIndustry = industries[realIndex];
                if (
                  syncedIndustry &&
                  activeIndustry?.label !== syncedIndustry.label
                ) {
                  setActiveIndustry(syncedIndustry);
                }
                if (
                  buttonSwiperRef.current &&
                  buttonSwiperRef.current.realIndex !== realIndex
                ) {
                  buttonSwiperRef.current.slideToLoop(realIndex);
                }
              }}
              className={styles.imageSwiper}
            >
              {industries.map((industry) => (
                <SwiperSlide key={industry.label}>
                  <img src={industry.image} alt={industry.label} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className={styles.sliderpaginationbtnsflx}>
            <Swiper
              slidesPerView={"auto"}
              spaceBetween={20}
              centeredSlides={true}
              loop={true}
              onSwiper={(swiper) => (buttonSwiperRef.current = swiper)}
              onSlideChange={(swiper) => {
                const realIndex = swiper.realIndex;
                const syncedIndustry = industries[realIndex];
                if (
                  syncedIndustry &&
                  activeIndustry?.label !== syncedIndustry.label
                ) {
                  setActiveIndustry(syncedIndustry);
                }
                if (
                  imageSwiperRef.current &&
                  imageSwiperRef.current.realIndex !== realIndex
                ) {
                  imageSwiperRef.current.slideToLoop(realIndex);
                }
              }}
              className={styles.mySwiper}
            >
              {industries.map((industry, index) => (
                <SwiperSlide key={industry.label} className={styles.btnSlide}>
                  <div
                    className={`${styles.btnmain} ${activeIndustry?.label === industry.label
                      ? styles.active
                      : ""
                      }`}
                    onClick={() => {
                      buttonSwiperRef.current?.slideToLoop(index);
                      imageSwiperRef.current?.slideToLoop(index);
                    }}
                  >
                    <button type="button" className={styles.btn}>
                      {industry.label}
                    </button>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
