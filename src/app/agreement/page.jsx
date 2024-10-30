import React from 'react';
import styles from './agreementPage.module.css';

const agreement = () => {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>TERMS AND CONDITIONS</h1>
        <p className={styles.introductionText}>Understand the rules and guidelines</p>
      </section>

      {/* Introduction Section */}
      <section className={styles.introduction}>

        <p className={styles.introductionText}>
          Last updated September 4th, 2024

          These Terms and Conditions ("Terms") govern your use of our website and services provided by hoolicon ("Company," "we," "us," or "our"). By accessing or using our website and services, you agree to comply with and be bound by these Terms.
        </p>

        <h2 className={styles.sectionTitle}>ACCEPTANCE OF TERMS</h2>
        <p className={styles.introductionText}>
          By using our website and services, you agree to these Terms. If you do not agree to these Terms, please do not use our website or services.
        </p>

        <h2 className={styles.sectionTitle}>CHANGES TO TERMS</h2>
        <p className={styles.introductionText}>
          We may update these Terms from time to time. The most current version will be posted on our website. Your continued use of our website and services after any changes indicates your acceptance of the new Terms.
        </p>

        <h2 className={styles.sectionTitle}>USE OF OUR SERVICES</h2>
        <p className={styles.introductionText}>
          You agree to use our services only for lawful purposes and in accordance with these Terms. You must not use our services in any way that could damage, disable, or impair our website or interfere with any other party’s use of our website.
        </p>

        <h2 className={styles.sectionTitle}>USER ACCOUNTS</h2>
        <p className={styles.introductionText}>
          You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
        </p>

        <h2 className={styles.sectionTitle}>INTELLECTUAL PROPERTY</h2>
        <p className={styles.introductionText}>
          All content and materials on our website are the intellectual property of hoolicon or our licensors. You may not use, reproduce, or distribute any content without our prior written permission.
        </p>

        <h2 className={styles.sectionTitle}>LIMITATION OF LIABILITY</h2>
        <p className={styles.introductionText}>
          To the extent permitted by law, we are not liable for any indirect, incidental, special, or consequential damages arising out of or related to your use of our services.
        </p>

        <h2 className={styles.sectionTitle}>GOVERNING LAW</h2>
        <p className={styles.introductionText}>
          These Terms are governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law principles.
        </p>

        <h2 className={styles.sectionTitle}>CONTACT US</h2>
        <p className={styles.introductionText}>
          If you have any questions about these Terms, please contact us at info@hoolicon.com.
        </p>
      </section>

      {/* Footer Section */}
      <footer className={styles.footer}>
        <p className={styles.footerText}>
          © 2024 hoolicon. All rights reserved. | <a href="/terms-and-conditions">Terms and Conditions</a>
        </p>
      </footer>
    </div>
  );
};

export default agreement;
