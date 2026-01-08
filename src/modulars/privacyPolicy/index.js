import React from 'react'
import styles from './privacyPolicy.module.scss';
import Link from 'next/link';
const HelixImage = "assets/logo/helix.png";

export default function PrivacyPolicy() {
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
            Privacy Policy
          </h1>
          <h6>
            Effective date: November 28, 2025

          </h6>
          <p>
            This Privacy Policy explains how we collect, use, and share information when you
            use Helix (“we”, “us”, “our”). By accessing or using our services, you agree to the
            practices described in this policy.

          </p>
          <h2>
            Information We Collect
          </h2>
          <ul>
            <li><span>Account Information: </span> Name, email address, authentication details, and
              subscription status.
            </li>
            <li><span>Usage Data: </span> Application interactions, device information, approximate
              location, log data, and diagnostics used to improve performance, reliability,
              and security.
            </li>
            <li><sapn> Content: </sapn> Media you upload or generate, prompts, and associated project
              metadata required to deliver the services.
            </li>
            <li><span>Payment Information: </span> Payments are processed by third-party payment
              processors (e.g., Stripe). We do not store full credit or debit card numbers on
              our servers.
            </li>
            <li><span>Cookies and Similar Technologies: </span> Used for authentication, preferences,
              analytics, and fraud prevention.
            </li>
          </ul>
          <h2>
            How We Use Information
          </h2>
          <p>
            We use the collected information to:
          </p>
          <ul>
            <li>Provide, operate, and maintain the Helix platform.
            </li>
            <li>Improve, optimize, and personalize features and user experience.
            </li>
            <li>Process payments and manage subscriptions.
            </li>
            <li>Communicate with users, including customer support and service-related
              notifications.
            </li>
            <li>Detect, prevent, and address fraud, abuse, and security risks.
            </li>
            <li>Comply with legal, regulatory, and contractual obligations.</li>
          </ul>
          <h2>
            Sharing of Information
          </h2>
          <p>
            We share information only with trusted third-party service providers who assist us
            in operating Helix, and only to the extent necessary for them to perform their
            services. These may include providers for:

          </p>
          <ul>
            <li>Cloud hosting and storage</li>
            <li>Analytics and monitoring
            </li>
            <li>Customer support and email delivery
            </li>
            <li>Media processing
            </li>
            <li>AI/ML model and infrastructure services
            </li>
            <li>Payment processing
            </li>
          </ul>
          <p>
            Examples of providers integrated into our technology stack may include Stripe
            (payments), email delivery services, analytics tools, and AI infrastructure partners.
            All such providers process data on our behalf under appropriate contractual and
            data protection obligations.
          </p>
          <h2>
            Cookies
          </h2>
          <p>
            Helix uses cookies and similar technologies to keep you authenticated, remember
            your preferences, analyze platform performance, and help protect against
            unauthorized access. You can manage or disable cookies through your browser
            settings, though some features of the platform may not function properly as a
            result.

          </p>
          <h2>
            Data Retention
          </h2>
          <p>
            We retain personal information only for as long as necessary to provide our
            services, fulfill legal and regulatory requirements, resolve disputes, and enforce
            our agreements. You may request deletion of your data as outlined below.
          </p>
          <h2>Your Rights
          </h2>
          <p>Depending on your jurisdiction, you may have rights to access, correct, delete, or
            export your personal data, and to object to or restrict certain processing activities.
            To exercise these rights, please contact us at support@helix.ai. We may require
            verification of your identity before processing your request.</p>
          <h2>Security</h2>
          <p>We implement reasonable technical and organizational safeguards designed to
            protect your information from unauthorized access, disclosure, or misuse.
            However, no method of data transmission or storage is completely secure, and we
            cannot guarantee absolute security.
          </p>
          <h2>International Data Transfers
          </h2>
          <p>If you access Helix from outside the country where our servers are located, your
            information may be transferred to and processed in countries with different data
            protection laws than those in your jurisdiction.
          </p>
          <h2>Children’s Privacy
          </h2>
          <p>Helix is not intended for use by children under the age of 13 (or the applicable age
            of digital consent in your jurisdiction). We do not knowingly collect personal
            information from children. If you believe a child has provided personal data to us,
            please contact us so we can take appropriate action.
          </p>
          <h2>Changes to This Policy
          </h2>
          <p>We may update this Privacy Policy from time to time. Any changes will be
            reflected by updating the “Effective date” above. Continued use of Helix after
            changes become effective constitutes acceptance of the updated policy.
          </p>
          <h2>Contact Us
          </h2>
          <p>If you have any questions about this Privacy Policy or our data practices, please
            contact us at <a href='mailto:support@helix.ai'>support@helix.ai</a>.</p>

        </div>
      </div>
    </div>
  )
}
