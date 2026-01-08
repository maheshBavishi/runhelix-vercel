import React from 'react'
import styles from './galleryView.module.scss';
import Image from 'next/image';
export const galleryImages = [
    '/assets/images/1.png',
    '/assets/images/2.png',
    '/assets/images/3.png',
    '/assets/images/4.png',
    '/assets/images/5.png',
    '/assets/images/6.png',
    '/assets/images/19.png',
    '/assets/images/7.png',
    '/assets/images/8.png',
    '/assets/images/9.png',
    '/assets/images/10.png',
    '/assets/images/11.png',
    '/assets/images/12.png',
    '/assets/images/13.png',
    '/assets/images/14.png',
    '/assets/images/15.png',
    '/assets/images/16.png',
    '/assets/images/17.png',
    '/assets/images/18.png',
    '/assets/images/19.png',
    '/assets/images/20.png',
    '/assets/images/21.png',
    '/assets/images/22.png',
    '/assets/images/23.png',
    '/assets/images/24.png',
];
export default function GalleryView() {
    return (
        <div className={styles.galleryView}>
            <div className={styles.masonryWrapper}>
                {galleryImages.map((src, index) => (
                    <div key={index} className={styles.masonryItem}>
                        <Image
                            src={src}
                            alt={`gallery-image-${index}`}
                            width={700}
                            height={700}
                            className={styles.image}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
