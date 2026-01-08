import React from "react";
import styles from "./helixblogs.module.scss";
import Link from "next/link";
import Calendericon from "../../../../public/assets/icons/calendericon";

const Cardimage = "/assets/images/cardimage.png";

export default function Helixblogs() {
  return (
    <>
      <div className={styles.helixblogsmain}>
        <div className="container-md">
          <div className={styles.title}>
            <h1>Helix Blog- Articles By Founder Tyler Marshall</h1>
          </div>
          <div className={styles.bloggrid}>
            <div className={styles.griditems}>
              <div className={styles.cardimg}>
                <img src={Cardimage} alt="Cardimage" />
              </div>
              <div className={styles.cardbody}>
                <div className={styles.cardbodyflx}>
                  <button type="button" className={styles.badgebtn}>
                    Business Growth
                  </button>
                  <span className={styles.calenderflx}>
                    <Calendericon />
                    Oct 30,2025
                  </span>
                </div>
                <h3>AI for Small Businesses: What’s Actually Working Today?</h3>
                <p>
                  Learn how small businesses use AI to forecast demand, handle
                  customers faster...
                </p>
              </div>
            </div>
            <div className={styles.griditems}>
              <div className={styles.cardimg}>
                <img src={Cardimage} alt="Cardimage" />
              </div>
              <div className={styles.cardbody}>
                <div className={styles.cardbodyflx}>
                  <button type="button" className={styles.badgebtn}>
                    Business Growth
                  </button>
                  <span className={styles.calenderflx}>
                    <Calendericon />
                    Oct 30,2025
                  </span>
                </div>
                <h3>AI for Small Businesses: What’s Actually Working Today?</h3>
                <p>
                  Learn how small businesses use AI to forecast demand, handle
                  customers faster...
                </p>
              </div>
            </div>
            <div className={styles.griditems}>
              <div className={styles.cardimg}>
                <img src={Cardimage} alt="Cardimage" />
              </div>
              <div className={styles.cardbody}>
                <div className={styles.cardbodyflx}>
                  <button type="button" className={styles.badgebtn}>
                    Business Growth
                  </button>
                  <span className={styles.calenderflx}>
                    <Calendericon />
                    Oct 30,2025
                  </span>
                </div>
                <h3>AI for Small Businesses: What’s Actually Working Today?</h3>
                <p>
                  Learn how small businesses use AI to forecast demand, handle
                  customers faster...
                </p>
              </div>
            </div>
          </div>
          <div className={styles.btnflx}>
            <Link href={"/"}>
              <button className={styles.articlebtn}>View all articles</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
