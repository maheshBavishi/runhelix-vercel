import React from "react";
import styles from "./prompttooutput.module.scss";

const parralaxcardsimg1 = "/assets/images/parralaxcardsimg1.webp";
const parralaxcardsimg2 = "/assets/images/parralaxcardsimg2.webp";
const parralaxcardsimg3 = "/assets/images/parralaxcardsimg3.webp";
const parralaxcardsimg4 = "/assets/images/parralaxcardsimg4.webp";
const parralaxcardsimg5 = "/assets/images/parralaxcardsimg5.webp";
const parralaxcardsimg6 = "/assets/images/parralaxcardsimg6.webp";
const parralaxcardsimg7 = "/assets/images/parralaxcardsimg7.webp";

const Outputimage = "/assets/images/outputimage.png";

export default function Prompttooutput() {
  return (
    <>
      <div className={styles.prompttooutputmain}>
        <div className="container-lg">
          <div className={styles.prompttooutputtopflx}>
            <h3>From Prompt</h3>
            <div className={styles.switchermain}>
              <div className={styles.switcher}>
                <div className={styles.switcherinner}></div>
              </div>
            </div>
            <h3>To Output</h3>
          </div>

          <div className={styles.title}>
            <h4>Helix Orchestration Layer</h4>
            <p>
              Watch as Helix’s AI Agents bring your product videos & images
              alive
            </p>
          </div>

          <div className={styles.parralaxcards}>
            <div className={styles.innerparralaxcardswrapp}>
              <div className={styles.parralaxcardsimg1}>
                <span>Concept Agent</span>
                <div className={styles.textblock}>
                  <p>Generates structured concepts aligned with user goals.</p>
                </div>
              </div>
              <div className={styles.parralaxcardsimg2}>
                <span>Script Agent</span>
                <div className={styles.textblock}>
                  <p>
                    Produces clear, engaging scripts based on approved concepts.
                  </p>
                </div>
              </div>
              <div className={styles.parralaxcardsimg3}>
                <span>Generation Agent</span>
                <div className={styles.textblock}>
                  <p>
                    Handles video generation with optimized prompt pipelines.
                  </p>
                </div>
              </div>
              <div className={styles.parralaxcardsimg4}>
                <span>QA Agent</span>
                <div className={styles.textblock}>
                  <p>
                    Performs quality checks and validation before final output
                    delivery.
                  </p>
                </div>
              </div>
              <div className={styles.parralaxcardsimg5}>
                <span>Visual Director Agent</span>
                <div className={styles.textblock}>
                  <p>
                    Translates scripts into detailed visual directions and shot
                    planning.
                  </p>
                </div>
              </div>
              <div className={styles.parralaxcardsimg6}>
                <span>QA Agent</span>
                <div className={styles.textblock}>
                  <p>
                    Performs quality checks and validation before final output
                    delivery.
                  </p>
                </div>
              </div>
              <div className={styles.parralaxcardsimg7}>
                <span>QA Agent</span>
                <div className={styles.textblock}>
                  <p>
                    Performs quality checks and validation before final output
                    delivery.
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.prompttooutputbottomgrdmain}>
              <div className="container-md">
                <div className={styles.prompttooutputbottomgrd}>
                  <div className={styles.grditemsleft}>
                    <div className={styles.leftboxfirst}>
                      <div className={styles.boxheader}>
                        <span>PROMPT</span>
                      </div>
                      <div className={styles.boxbody}>
                        <p>
                          Create a cinematic promotional video in landscape for a modern smart IoT watch highlighting performance, health tracking, and everyday wear. Show the watch in dramatic lighting with smooth camera motion and close-up details of the display and sensors. Include brief lifestyle moments and minimal UI overlays for key features like heart rate, sleep, and notifications. Use a dark, premium cinematic look with music-driven pacing and end on a strong hero shot with a subtle light sweep.
                        </p>
                      </div>
                    </div>
                    <div className={styles.leftboxsecond}>
                      <div className={styles.leftboxsecondbox}>
                        <span>RUN</span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.grditemsright}>
                    <div className={styles.rightboxfirst}>
                      <div className={styles.boxheader}>
                        <span>OUTPUT</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
