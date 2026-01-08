import React from "react";
import styles from "./ugcads.module.scss";

const Adsimage1 = "./assets/images/adsimage1.png";
const Adsimage2 = "./assets/images/adsimage2.png";
const Adsimage3 = "./assets/images/adsimage3.png";

export default function Ugcads() {
  return (
    <>
      <div className={styles.ugcadsmain}>
        <div className="container-md">
          <div className={styles.title}>
            <h2>AI UGC Ads Currently Converting Millions</h2>
          </div>
          <div className={styles.cardflxmain}>
            <div className={styles.flexitemsleft}>
              <img src={Adsimage1} alt="Adsimage1" />
            </div>
            <div className={styles.flexitemscenter}>
              <img src={Adsimage2} alt="Adsimage2" />
            </div>
            <div className={styles.flexitemsright}>
              <img src={Adsimage3} alt="Adsimage3" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
