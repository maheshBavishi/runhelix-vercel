'use client'
import React from 'react'
import styles from './productDataTable.module.scss';
import { motion } from 'framer-motion';
export const tableData = [
    {
        title: "Entrepreneur or SMB",
        points: [
            "Launch new products fast with ad-ready photos and videos in minutes.",
            "Test 10 ideas a day — boost what converts, skip what doesn’t.",
            "Focus on selling, not shooting."
        ]
    },
    {
        title: "Agency",
        points: [
            "Deliver high-volume creative for multiple clients — instantly and profitably.",
            "Replace traditional production with AI to scale without adding headcount.",
            "Boost client retainers and margins with faster, smarter content output."
        ]
    },
    {
        title: "In-House Brand Team (Enterprise)",
        points: [
            "Streamline content ops across teams and campaigns.",
            "Maintain brand consistency while generating infinite assets.",
            "Keep your internal studio producing 24/7 — without creative bottlenecks."
        ]
    }
];
export default function ProductDataTable() {
    return (
        <div className={styles.productDataTable}>
            <div className='container-sm'>
                <motion.div
                    className={styles.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    viewport={{ once: true }}
                >
                    <h2> Run Helix As an..</h2>
                </motion.div>

                <div className={styles.tableUi}>
                    <table>
                        <thead>
                            <tr>
                                {tableData.map((col, i) => (
                                    <th key={i}>{col.title}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {tableData[0].points.map((_, rowIndex) => (
                                <tr key={rowIndex}>
                                    {tableData.map((col, colIndex) => (
                                        <td key={colIndex}>{col.points[rowIndex]}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

