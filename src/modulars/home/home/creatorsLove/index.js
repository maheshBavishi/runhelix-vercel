'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './creatorsLove.module.scss';

const StarIcon = '/assets/icons/star.svg';
const QuoteIcon = '/assets/icons/quote.svg';

/* ------------------ STATIC DATA ------------------ */
const testimonials = [
    {
        name: 'Sarah Chen',
        role: 'E-commerce Director, StyleCo',
        initials: 'CM',
        message:
            'Helix transformed our product photography workflow. We went from weeks to hours, and the quality is incredible.',
    },
    {
        name: 'David Miller',
        role: 'Founder, UrbanWear',
        initials: 'DM',
        message:
            'The speed and consistency Helix provides is unmatched. Our creatives look premium every single time.',
    },
    {
        name: 'Aisha Khan',
        role: 'Brand Lead, ModaX',
        initials: 'AK',
        message:
            'Our team scaled content production effortlessly. Helix is now part of our daily workflow.',
    },
];

/* ------------------ ANIMATIONS ------------------ */
const titleVariants = {
    hidden: {
        opacity: 0,
        y: 30,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: 'easeOut',
        },
    },
};

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const cardVariants = {
    hidden: {
        opacity: 0,
        y: 40,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: 'easeOut',
        },
    },
};

/* ------------------ COMPONENT ------------------ */
export default function CreatorsLove() {
    return (
        <div className={styles.creatorsLove}>
            <div className="container-sm">

                {/* Title */}
                <motion.div
                    className={styles.title}
                    variants={titleVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <h2>Creators Love Helix</h2>
                </motion.div>

                {/* Cards Grid */}
                <motion.div
                    className={styles.grid}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {testimonials.map((item, index) => (
                        <motion.div
                            key={index}
                            className={styles.griditems}
                            variants={cardVariants}
                        >
                            {/* Card Header */}
                            <div className={styles.cardHeader}>
                                <div className={styles.starIcons}>
                                    {[...Array(5)].map((_, i) => (
                                        <img key={i} src={StarIcon} alt="StarIcon" />
                                    ))}
                                </div>
                                <img src={QuoteIcon} alt="QuoteIcon" />
                            </div>

                            {/* Card Body */}
                            <div className={styles.cardbody}>
                                <p>"{item.message}"</p>
                            </div>

                            {/* Card Footer */}
                            <div className={styles.cardFooter}>
                                <div className={styles.profile}>
                                    {item.initials}
                                </div>
                                <div>
                                    <p>{item.name}</p>
                                    <span>{item.role}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </div>
    );
}
