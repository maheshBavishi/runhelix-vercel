import React from 'react'
import styles from './termsAndConditions.module.scss';
import Link from 'next/link';
const HelixImage = "assets/logo/helix.png";

export default function TermsAndConditions() {
    return (
        <div className={styles.termsAndConditions}>
            <div className={styles.btnright}>
                <div className={styles.headerlogo}>
                    <Link href="/">
                        <img src={HelixImage} alt="HelixImage" />
                    </Link>
                </div>
                <a href="https://platform.runhelix.ai/auth" target="_blank">
                    <button>Login</button>
                </a>
            </div>
            <div className={styles.spacingAlignment}>
                <div className={styles.container}>
                    <h1>
                        Terms of Service
                    </h1>
                    <h6>
                        Effective date: November 28, 2025
                    </h6>
                    <p>
                        These Terms of Service (“Terms”) govern your access to and use of the <span>Helix </span>
                        platform, products, and services (collectively, the “Services”). By accessing or
                        using the Services, you agree to be bound by these Terms.
                    </p>
                    <h2>
                        Eligibility
                    </h2>
                    <p>
                        You must be at least the age of majority in your jurisdiction and legally capable of
                        entering into a binding contract to use the Services.
                    </p>
                    <h2>
                        Accounts
                    </h2>
                    <p>
                        You are responsible for maintaining the accuracy of information associated with
                        your account and for all activities that occur under your account. You must keep
                        your login credentials secure and notify us immediately of any unauthorized
                        access or use. Helix reserves the right to suspend or terminate accounts that
                        violate these Terms.
                    </p>
                    <h2>
                        Subscriptions and Billing
                    </h2>
                    <p>
                        Some features of Helix require a paid subscription. Pricing, features, and billing
                        cycles may be modified from time to time. We will provide notice of material
                        changes as required by applicable law. Applicable taxes may be added to
                        subscription fees where required.
                    </p>
                    <h2>
                        User Content and License
                    </h2>
                    <p>
                        You retain ownership of any content you upload, submit, or generate through the
                        Services. By using Helix, you grant us a limited, worldwide, non-exclusive,
                        transferable, and sublicensable license to host, store, reproduce, process, and
                        display your content solely for the purposes of operating, maintaining, securing,
                        and improving the Services.
                    </p>
                    <h2>
                        Acceptable Use
                    </h2>
                    <p>
                        You agree not to misuse the Services. This includes, but is not limited to:
                    </p>
                    <ul>
                        <li>Uploading or generating illegal, harmful, abusive, or infringing content
                        </li>
                        <li>Attempting to reverse engineer, exploit, or bypass platform safeguards</li>
                        <li>Interfering with or disrupting the integrity or performance of the Services</li>
                        <li>Violating the rights, privacy, or security of other users</li>
                    </ul>
                    <h2>
                        AI and Media Processing
                    </h2>
                    <p>
                        Helix may use third-party AI/ML models and media processing providers to deliver
                        certain features. While we strive to ensure reliable and compliant integrations, we
                        do not guarantee the accuracy, completeness, or suitability of generated outputs.
                        You are responsible for reviewing, validating, and ensuring the appropriateness of
                        all generated content before use.
                    </p>
                    <h2>
                        Intellectual Property
                    </h2>
                    <p>
                        All rights, title, and interest in and to the Helix platform, including software, code,
                        interfaces, designs, branding, and trademarks, are owned by Helix or its licensors.
                        Except as expressly permitted under these Terms, you may not copy, modify,
                        distribute, or create derivative works from the Services.
                    </p>
                    <h2>
                        Third-Party Services
                    </h2>
                    <p>
                        The Services may contain links to or integrations with third-party platforms or
                        services. Helix does not control and is not responsible for third-party content,
                        availability, or practices. Your use of third-party services is governed by their
                        respective terms and policies.
                    </p>
                    <h2>
                        Disclaimers
                    </h2>
                    <p>
                        THE SERVICES ARE PROVIDED ON AN “AS IS” AND “AS AVAILABLE” BASIS,
                        WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED,
                        INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
                        PURPOSE, AND NON-INFRINGEMENT. WE DO NOT GUARANTEE THAT THE
                        SERVICES WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE.
                    </p>
                    <h2>
                        Limitation of Liability
                    </h2>
                    <p>
                        TO THE MAXIMUM EXTENT PERMITTED BY LAW, HELIX SHALL NOT BE LIABLE
                        FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE
                        DAMAGES, OR FOR ANY LOSS OF PROFITS, REVENUE, DATA, OR GOODWILL,
                        ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICES, EVEN IF
                        ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
                    </p>
                    <h2>
                        Termination
                    </h2>
                    <p>
                        You may discontinue using the Services at any time. Helix may suspend or
                        terminate your access if you violate these Terms, pose a security or legal risk, or
                        cause harm to the platform, other users, or third parties.

                    </p>
                    <h2>
                        Governing Law
                    </h2>
                    <p>
                        These Terms shall be governed by and construed in accordance with the laws of
                        the jurisdiction in which Helix’s principal place of business is located, without
                        regard to conflict of law principles. Any disputes shall be subject to the exclusive
                        jurisdiction of the courts of that jurisdiction.

                    </p>
                    <h2>
                        Changes to These Terms

                    </h2>
                    <p>
                        We may update these Terms from time to time. The “Effective date” above will
                        reflect the latest revision. Continued use of the Services after changes become
                        effective constitutes acceptance of the revised Terms.

                    </p>
                    <h2>
                        Contact
                    </h2>
                    <p>
                        If you have questions about these Terms, please contact us at
                        <a href='mailto:support@helix.ai'>support@helix.ai.</a>
                    </p>
                </div>
            </div>
        </div>
    )
}
