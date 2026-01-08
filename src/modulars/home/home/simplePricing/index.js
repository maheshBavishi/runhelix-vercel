import React from "react";
import styles from "./simplePricing.module.scss";
export default function SimplePricing() {
  return (
    <>
      <div className={styles.simplepricingmain}>
        <div className="container-md">
          <div className={styles.title}>
            <h1>Simple Pricing</h1>
            <div className={styles.togglechip}>
              <div className={styles.togglechileft}>
                <p>Monthly Billing</p>
              </div>
              <div className={styles.togglechiright}>
                <p>Yearly Billing</p>
                <div className={styles.savebtn}>
                  <span>Save 20%</span>
                </div>
              </div>
            </div>
            <div className={styles.titlepera}>
              <p>
                VIDEOS: UGC · Ads · Promotional · Educational · Short-form ·
                Long-form IMAGES: Photoshoot · Lifestyle · Model · Infographic
              </p>
            </div>
          </div>
          <div className={styles.grid}>
            <div className={styles.griditemsmain}>
              <div className={styles.griditems}>
                <div className={styles.ticket}>
                  <span>Start</span>
                </div>
                <div className={styles.griditemsbody}>
                  <div className={styles.griditemsbodytext}>
                    <p>
                      - Up to 30:12 Videos/ month <br /> ~1 Video/ day <br />{" "}
                      post across all social channels
                    </p>
                    <p>+ Up to 300 Free Images</p>
                    <p>
                      - Ideal for founders, solo <br />
                      operators, early launches
                    </p>
                    <p>
                      - No contracts. Cancel
                      <br />
                      anytime.
                    </p>
                    <h6>$99/ month</h6>
                  </div>
                  <button className={styles.subscribebtn}>SUBSCRIBE</button>
                </div>
              </div>
            </div>
            <div className={styles.griditemsmain}>
              <div className={styles.griditems}>
                <div className={styles.ticket}>
                  <span>Scale</span>
                </div>
                <div className={styles.griditemsbody}>
                  <div className={styles.griditemsbodytext}>
                    <p>
                      - Up to 150: 12 Videos/ <br />
                      month <br />
                      ~5 Videos/ day <br />
                      post across all social channels
                    </p>
                    <p>+ Up to 1500 Free Images</p>
                    <p>
                      - Built for scaling DTC brands <br />
                      and product teams
                    </p>
                    <p>
                      - Consistent daily content <br />
                      across social & ads.
                    </p>
                    <h6>$499/ month</h6>
                  </div>
                  <button className={styles.subscribebtn}>SUBSCRIBE</button>
                </div>
              </div>
            </div>
            <div className={styles.griditemsmain}>
              <div className={styles.griditems}>
                <div className={styles.ticket}>
                  <span>Agency</span>
                </div>
                <div className={styles.griditemsbody}>
                  <div className={styles.griditemsbodytext}>
                    <p>
                      - Up to 450: 12 Videos/ <br />
                      month ~15 Videos/ day <br />
                      post across all social channels
                    </p>
                    <p>+ Up to 4500 Free Images</p>
                    <p>
                      - Designed for agencies & <br />
                      in-house brand teams
                    </p>
                    <p>
                      - Serve multiple clients <br />
                      without adding headcount.
                    </p>
                    <h6></h6>
                  </div>
                  <button className={styles.subscribebtn}>SUBSCRIBE</button>
                </div>
              </div>
            </div>
            <div className={styles.griditemsmain}>
              <div className={styles.griditemssc}>
                <div className={styles.griditemsbody}>
                  <div className={styles.griditemsbodytext}>
                    <p>
                      <span className={styles.underlined}>
                        Monthly Savings:
                      </span>{" "}
                      $7,400/ month
                    </p>
                    <p>
                      <span className={styles.underlined}>
                        Traditional Cost*:
                      </span>{" "}
                      30 UGC videos × $250 <br />
                      = $7,500/ month <br />
                      paid to affiliates & creators
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.griditemsmain}>
              <div className={styles.griditemssc}>
                <div className={styles.griditemsbody}>
                  <div className={styles.griditemsbodytext}>
                    <p>
                      <span className={styles.underlined}>
                        Monthly Savings:
                      </span>{" "}
                      $37,000/ month
                    </p>
                    <p>
                      <span className={styles.underlined}>
                        Traditional Cost*:
                      </span>{" "}
                      150 UGC videos × $250 <br />
                      = $37,500/ month <br />
                      paid to affiliates & creators
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.griditemsmain}>
              <div className={styles.griditemssc}>
                <div className={styles.griditemsbody}>
                  <div className={styles.griditemsbodytext}>
                    <p className={styles.underlined}>
                      <span>Monthly Savings:</span>
                      $20K–$111K/ month, <br />
                      depending on approach
                    </p>
                    <p className={styles.underlined}>
                      <span>Traditional Cost*:</span>
                      Option A — <br />
                      Outsourcing production: <br />
                      450 videos × $250 <br />= $112,500/ month
                    </p>
                    <p className={styles.underlined}>
                      <span>Option B —</span>
                      In-house Team: <br />
                      - 2 video editors <br />
                      @ ~$11,600/ month <br />
                      - 2 UGC creators <br />
                      @ ~$10,000/ month <br />
                      - Total internal cost: <br />
                      ~$21,600/ month
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.pricingbottommain}>
            <div className={styles.pricingbottom}>
              <div className={styles.pricingbottomtopbox}>
                <h6>Enterprise Integration</h6>
                <p>
                  High-volume Video Throughput Tier <br />
                  White Labeling- Branded with Your Interfaces <br />
                  API & Custom Integrations- Social, Cloud, DAM, CRM, Workflow
                  Tools <br />
                  99.5% uptime SLA and priority support, full analytics &
                  reporting dashboard <br />
                  Dedicated Account & Technical Support Managers <br />
                  $4,999 Set-up Fee + Integrations Custom Model Tuning & Content
                  Tiers <br />
                  Contact for Custom Configuration Plan
                </p>
                <button type="button" className={styles.contactbtn}>
                  CONTACT US
                </button>
              </div>
              <div className={styles.pricingbottombottombox}>
                <p className={styles.litsttitle}>* Industry Benchmark Costs</p>
                <ul>
                  <li>Agency short-form video: $800–$1,500 per video</li>
                  <li>UGC creator (10–15 sec): $250–$600 per video</li>
                  <li>
                    In-house video hire: $65K–$90K/year ($5,400–$7,500/month per
                    person)
                  </li>
                  <li>Production timelines: days to weeks</li>
                </ul>
                <p className={styles.instantly}>Run Helix: Instantly</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
