import React from 'react'
import styles from './galleryView.module.scss';
import Image from 'next/image';
export const galleryImages = [
    '/assets/images/1.png',
    '/assets/images/2.png',
    '/assets/video/video01.mp4',
    '/assets/images/3.png',
    '/assets/images/4.jpg',
    '/assets/images/5.jpg',
    '/assets/images/6.png',
    '/assets/images/19.jpg',
    '/assets/images/8.png',
    '/assets/images/9.png',
    '/assets/images/10.png',
    '/assets/images/19.jpg',
    '/assets/images/12.png',
    '/assets/video/video03.mp4',
    '/assets/images/17.jpg',
    '/assets/images/7.png',
    '/assets/images/18.png',
    '/assets/video/video02.mp4',
    '/assets/images/13.png',
    '/assets/images/14.png',
    '/assets/images/15.png',
    '/assets/images/16.png',
    '/assets/images/11.png',
    '/assets/images/20.png',
    '/assets/images/21.png',
    '/assets/images/22.png',
    '/assets/images/23.png',
    '/assets/images/24.png',
    '/assets/video/video04.mp4',
];
export default function GalleryView() {
    return (
        <div className={styles.galleryView}>
            <h1>Created with Helix</h1>
            <div className={styles.masonryWrapper}>
                {galleryImages.map((src, index) => {
                    const isVideo = src.endsWith('.mp4') || src.endsWith('.webm') || src.endsWith('.ogg');
                    return (
                        <div key={index} className={styles.masonryItem}>
                            {isVideo ? (
                                <video
                                    autoPlay
                                    playsInline
                                    muted
                                    loop
                                    src={src}

                                    width={500}
                                    height={600}
                                    className={styles.video}
                                />
                            ) : (
                                <Image
                                    src={src}
                                    alt={`gallery-image-${index}`}
                                    width={700}
                                    height={700}
                                    className={styles.image}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    )
}
