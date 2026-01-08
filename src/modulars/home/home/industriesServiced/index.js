"use client";
import React from "react";
import { motion } from "framer-motion";
import styles from "./industriesServiced.module.scss";

const ServiceImage = "/assets/images/main-service.png";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1], // smooth, premium easing
    },
  },
};

export default function IndustriesServiced() {
  return (
    <section className={styles.industriesServiced}>
      <div className="container-sm">
        {/* Title Animation */}
        <motion.div
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2>Industries Serviced</h2>
          <p>
            Instantly Create Stunning AI-Generated Product Videos & Images For
            Your:
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          className={styles.flexBox}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div
            className={styles.items}
            variants={cardVariants}
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className={styles.image}>
              <img src={ServiceImage} alt="ServiceImage" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
