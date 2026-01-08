import React from 'react'
import styles from './aiUgc.module.scss';
const Topvec = '/assets/images/top-vec.png';
const FastMoss = '/assets/icons/fast-moss.svg';
const LeftVideo = '/assets/video/left-video.mp4';
const RightVideo = '/assets/video/right-video.mp4';
const TiktokFrame = '/assets/images/tiktok-frame.png';
const TiktokFrameRight = '/assets/images/tiktok-frame-right.png';
export default function AiUgc() {
    return (
        <div className={styles.aiugc}>
            <div className={styles.topvec}>
                <img src={Topvec} alt='Topvec' />
            </div>
            <div className='container-md'>
                <div className={styles.title}>
                    <h2>
                        AI UGC Ads Currently Convert Millions in Revenue
                    </h2>
                    <p>
                        UCG Videos Created with Helix
                    </p>
                </div>
                <div className={styles.twovideo}>
                    <div className={styles.items}>
                        <video src={LeftVideo} alt="LeftVideo" autoPlay playsInline muted loop></video>
                        <div className={styles.framer}>
                            <img src={TiktokFrame} alt='TiktokFrame' />
                        </div>
                    </div>
                    <div className={styles.items}>
                        <video src={RightVideo} alt="RightVideo" autoPlay playsInline muted loop></video>
                        <div className={styles.framer}>
                            <img src={TiktokFrameRight} alt='TiktokFrameRight' />
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.rightAlignment}>
                <span>
                    Source:
                </span>
                <img src={FastMoss} alt='FastMoss' />
            </div>
        </div>
    )
}
