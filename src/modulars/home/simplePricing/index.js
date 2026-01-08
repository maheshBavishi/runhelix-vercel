"use client";
import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import styles from "./simplePricing.module.scss";

const CheckIcon = '/assets/icons/check-icon.svg';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log("Supabase Config Debug:", {
  urlExists: !!supabaseUrl,
  keyExists: !!supabaseAnonKey,
  url: supabaseUrl, // CAUTION: Review this log in production console!
});

const supabase = (supabaseUrl && supabaseAnonKey) ? createClient(supabaseUrl, supabaseAnonKey) : null;

export default function SimplePricing() {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    async function fetchPlans() {
      console.log("Fetching plans... Supabase client exists:", !!supabase);
      if (!supabase) {
        console.error("Supabase client is null. Check env vars.");
        return;
      }
      const { data, error } = await supabase
        .from("plan")
        .select("*")
        .order("price", { ascending: true });

      if (error) {
        console.error("Error fetching plans:", error);
      }

      if (data) {
        console.log("Plans fetched successfully:", data);
        setPlans(data);
      }
    }
    fetchPlans();
  }, []);

  const filteredPlans = plans.filter((plan) => plan.type === billingCycle);

  // Helper to render the specific static body content based on plan name
  const renderCardBody = (planName) => {
    const name = planName.toLowerCase();
    if (name.includes("start")) {
      return (
        <div className={styles.cardBody}>
          <ul className={styles.featuresList}>
            <li className={styles.highlight}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Up to 30 videos/ month <span><small>(:12 second video)</small></span></span>
            </li>
            <li>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>:12, :24, :48 second video options</span>
            </li>
            <li>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Up to 300 Free Images</span>
            </li>
            <li>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path d="M12 16V12M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Ideal for founders, solo operators, early launches</span>
            </li>
            <li>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 11.08V12A10 10 0 1 1 11.7259 2.08" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>No contracts. Cancel <br /> anytime.</span>
            </li>
          </ul>

          <div className={styles.divider}></div>

          <div className={styles.savingsCompact}>
            <div className={styles.savingsTop}>
              <div className={styles.saveTitle}>Monthly Savings</div>
              <div className={styles.saveValue}>$7,400<span>/mo</span></div>
            </div>
            <div className={styles.savingsBottom}>
              <div className={styles.traditionalContent}>
                <strong>Traditional Cost:</strong> 30 UGC videos × $250
                <br />= $7,500/ month <br />
                <span className={styles.subtext}>paid to affiliates & creators</span>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (name.includes("scale")) {
      return (
        <div className={styles.cardBody}>
          <ul className={styles.featuresList}>
            <li className={styles.highlight}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Up to 150 videos/ month <span><small>(:12 second video)</small></span></span>
            </li>
            <li>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>:12, :24, :48 second video options</span>
            </li>
            <li>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Up to 1500 Free Images</span>
            </li>
            <li>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path d="M12 16V12M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Built for scaling DTC brands and product teams</span>
            </li>
            <li>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 11.08V12A10 10 0 1 1 11.7259 2.08" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Consistent daily content across social & ads</span>
            </li>
          </ul>

          <div className={styles.divider}></div>

          <div className={styles.savingsCompact}>
            <div className={styles.savingsTop}>
              <div className={styles.saveTitle}>Monthly Savings</div>
              <div className={styles.saveValue}>$37,000<span>/mo</span></div>
            </div>
            <div className={styles.savingsBottom}>
              <div className={styles.traditionalContent}>
                <strong>Traditional Cost:</strong> 150 UGC videos × $250
                <br />= $37,500/ month <br />
                <span className={styles.subtext}>paid to affiliates & creators</span>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (name.includes("agency")) {
      return (
        <div className={styles.cardBody}>
          <ul className={styles.featuresList}>
            <li className={styles.highlight}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Up to 450 videos/ month <span><small>(:12 second video)</small></span></span>
            </li>
            <li>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>:12, :24, :48 second video options</span>
            </li>
            <li>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Up to 4500 Free Images</span>
            </li>
            <li>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path d="M12 16V12M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Designed for agencies & in-house brand teams</span>
            </li>
            <li>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 11.08V12A10 10 0 1 1 11.7259 2.08" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Serve multiple clients without adding headcount</span>
            </li>
          </ul>

          <div className={styles.divider}></div>

          <div className={styles.savingsCompact}>
            <div className={styles.savingsTop}>
              <div className={styles.saveTitle}>Monthly Savings</div>
              <div className={styles.saveValue}>$20K–111K<span>/mo</span><div className={styles.subtextSmall}>depending on approach</div></div>
            </div>
            <div className={styles.savingsBottom}>
              <div className={styles.traditionalContent}>
                <strong>Traditional Cost:</strong>
                <div className={styles.optionBlock}>
                  <strong>Option A — Outsourcing:</strong><br />
                  450 videos × $250 = $112,500/mo
                </div>
                <div className={styles.optionBlock}>
                  <strong>Option B — In-house:</strong><br />
                  - 2 video editors (~$11,600/mo)<br />
                  - 2 UGC creators (~$10,000/mo)<br />
                  = ~$21,600/ month
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <div className={styles.simplepricingmain} id="pricing">
        <div className="container-md">
          <div className={styles.title}>
            <h1>Simple Pricing</h1>
            <div className={styles.togglechip}>
              <div
                className={`${styles.togglechileft} ${billingCycle === 'monthly' ? styles.active : ''}`}
                onClick={() => setBillingCycle('monthly')}
                style={{ cursor: 'pointer', background: billingCycle === 'monthly' ? '#29a6b4' : 'transparent', color: billingCycle === 'monthly' ? '#fff' : 'inherit' }}
              >
                <p>Monthly Billing</p>
              </div>
              <div
                className={`${styles.togglechiright} ${billingCycle === 'yearly' ? styles.active : ''}`}
                onClick={() => setBillingCycle('yearly')}
                style={{ cursor: 'pointer', background: billingCycle === 'yearly' ? '#29a6b4' : 'transparent', color: billingCycle === 'yearly' ? '#fff' : 'inherit' }}
              >
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
            {filteredPlans.map((plan) => (
              <div key={plan.id} className={`${styles.pricingCard} ${plan.name.toLowerCase().includes('scale') ? styles.popular : ''}`}>
                {plan.name.toLowerCase().includes('scale') && <div className={styles.popularBadge}>Most Popular</div>}
                <div className={styles.cardHeader}>
                  <div className={styles.tierName}>{plan.name}</div>
                  <div className={styles.price}>
                    ${billingCycle === "yearly" ? Math.round(plan.price / 12) : plan.price}
                    <span>/ month</span>
                  </div>
                  {billingCycle === "yearly" && (
                    <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                      Billed ${plan.price} yearly
                    </div>
                  )}
                </div>

                <a
                  className={styles.subscribeBtn}
                  href={`https://platform.runhelix.ai/pricing?plan=${plan.name}&billing=${billingCycle}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  SUBSCRIBE
                </a>

                {renderCardBody(plan.name)}
              </div>
            ))}
            {/* Logic fallback if no plans loaded yet */}
            {plans.length === 0 && (
              <div style={{ width: '100%', textAlign: 'center', gridColumn: 'span 3', padding: '40px' }}>Loading plans...</div>
            )}
          </div>

          <div className={styles.pricingbottommain}>
            <div className={styles.pricingbottom}>
              <div className={styles.pricingbottomtopbox}>
                <h6>Enterprise Integration</h6>
                <div className={styles.iconText}>
                  <img src={CheckIcon} alt="CheckIcon" />
                  <span>High-volume Video Throughput Tier</span>
                </div>
                <div className={styles.iconText}>
                  <img src={CheckIcon} alt="CheckIcon" />
                  <span> White Labeling- Branded with Your Interfaces</span>
                </div>
                <div className={styles.iconText}>
                  <img src={CheckIcon} alt="CheckIcon" />
                  <span>API & Custom Integrations- Social, Cloud, DAM, CRM, Workflow
                    Tools</span>
                </div>
                <div className={styles.iconText}>
                  <img src={CheckIcon} alt="CheckIcon" />
                  <span>99.5% uptime SLA and priority support, full analytics &
                    reporting dashboard</span>
                </div>
                <div className={styles.iconText}>
                  <img src={CheckIcon} alt="CheckIcon" />
                  <span>Dedicated Account & Technical Support Managers</span>
                </div>
                <div className={styles.iconText}>
                  <img src={CheckIcon} alt="CheckIcon" />
                  <span>$4,999 Set-up Fee + Integrations Custom Model Tuning & Content
                    Tiers</span>
                </div>
                <div className={styles.iconText}>
                  <img src={CheckIcon} alt="CheckIcon" />
                  <span>Contact for Custom Configuration Plan</span>
                </div>
                {/* <a href="https://platform.runhelix.ai/auth" target="_blank"> */}
                <button type="button" className={styles.contactbtn}>
                  Contact Us
                </button>
                {/* </a> */}
              </div>
              <div className={styles.pricingbottombottombox}>
                <p className={styles.litsttitle}>* Industry Benchmark Costs</p>
                <ul>
                  <li>Agency short-form video: $800–$1,500 per video</li>
                  <li>UGC creator (10–15 sec): $250–$600 per video</li>
                  <li>
                    In-house video hire: $65K–$90K/year ($5,400–$7,500/ month per
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
