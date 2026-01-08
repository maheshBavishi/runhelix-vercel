import React from 'react'
import styles from './footer.module.scss';
import Link from 'next/link';
const Footerlogo = '/assets/logo/footer-logo.svg';
const TwitterIcon = '/assets/icons/twitter.svg';
const LinkdinIcon = '/assets/icons/linkdin-footer.svg';
const YoutubeIcon = '/assets/icons/youtube-md.svg';
const TiktokIcon = '/assets/icons/tiktok-svg.svg';
const InstaIcon = '/assets/icons/insta-md.svg';
export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className='container-sm'>
                <div className={styles.footerAlignment}>
                    <div>
                        <div className={styles.logo}>
                            <img src={Footerlogo} alt='Footerlogo' />
                            <span>
                                The DNA of Consumer Technology Product Storytelling
                            </span>
                        </div>
                        <div className={styles.socialIconAlignment}>
                            <a href="https://www.linkedin.com/company/run-helix-ai" target='_blank'>
                                <img src={LinkdinIcon} alt='LinkdinIcon' />
                            </a>
                            <a href="https://www.instagram.com/runhelix_ai/" target='_blank'>
                                <img src={InstaIcon} alt='InstaIcon' />
                            </a>
                             <a href="https://www.youtube.com/@RunHelix_AI" target='_blank'>
                                <img src={YoutubeIcon} alt='YoutubeIcon' />
                            </a>
                            <a href="https://www.tiktok.com/@runhelix_ai" target='_blank'>
                                <img src={TiktokIcon} alt='TiktokIcon' />
                            </a>
                           
                        </div>
                    </div>
                    <div className={styles.menu}>
                        <p>Links</p>
                        <a href="#industries">Industries</a>
                        <a href="#work-flow">Workflow</a>
                        <a href="#pricing">Pricing</a>
                        <a href='https://platform.runhelix.ai/auth' target='_blank'>Log In
                        </a>
                    </div>

                </div>
                <div className={styles.copyright}>
                    <p> Copyright © Helix</p>
                    <div className={styles.towText}>
                        <Link href="/privacy-policy">Privacy Policy</Link>
                        <Link href="/terms-and-conditions">Terms and Conditions</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
