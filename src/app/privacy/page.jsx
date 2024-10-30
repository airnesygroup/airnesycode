import React from 'react';
import styles from './privacyPage.module.css';

const privacy = () => {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>PRIVACY POLICY</h1>
        <p className={styles.heroSubtitle}>hoolicon Privacy Policy Notice</p>
      </section>

      {/* Mission Statement Section */}
      <section className={styles.mission}>

        <p className={styles.missionText}>
          Last updated September 4th, 2024

          This privacy notice for hoolicon (doing business as hoolicon) (“Company,” “we,” “us,” or “our“), describes how and why we might collect, store, use, 
          and/or share (“process“) your information when you use our services (“Services“), such as when you:
        </p>

        <ul className={styles.policyList}>
          <li>Visit our website at [ https://www.hoolicon.com], or any website of ours that links to this privacy notice</li>
          <li>Download and use our application(s), such as our mobile application — [hoolicon mobile app], or any other application of ours that links to this privacy notice</li>
          <li>Engage with us in other related ways ― including any sales, marketing, or events</li>
        </ul>

        <p className={styles.missionText}>
          Questions or concerns? Reading this privacy notice will help you understand your privacy rights and choices. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at info@hoolicon.com.
        </p>

        <h2 className={styles.missionTitle}>SUMMARY OF KEY POINTS</h2>

        <p className={styles.missionText}>
          This summary provides key points from our privacy notice.
        </p>

        <ul className={styles.policyList}>
          <li><b>What personal information do we process?</b> <br />When you visit, use, or navigate our Services, we may process personal information depending on how you interact with hoolicon and the Services, the choices you make, and the products and features you use.</li>
          <li><b>Do we process any sensitive personal information?</b> <br />[We do not process sensitive personal information. / We may process sensitive personal information when necessary with your consent or as otherwise permitted by applicable law.]</li>
          <li><b>Do you receive any information from third parties?</b> <br />We may receive information from public databases, marketing partners, social media platforms, and other outside sources.</li>
          <li><b>How do you process my information?</b> <br />We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent. We process your information only when we have a valid legal reason to do so.</li>
          <li><b>In what situations and with which types of parties do we share personal information?</b> <br />We may share information in specific situations and with specific categories of third parties.</li>
          <li><b>How do we keep your information safe?</b> <br />We have organizational and technical processes and procedures in place to protect your personal information. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information.</li>
          <li><b>What are your rights?</b> <br />Depending on where you are located geographically, the applicable privacy law may mean you have certain rights regarding your personal information.</li>
          <li><b>How do I exercise my rights?</b> <br />The easiest way to exercise your rights is by filling out our data subject request form available here: [DSAR Form URL], or by contacting us. We will consider and act upon any request in accordance with applicable data protection laws.</li>
        </ul>
      </section>

      <section className={styles.mission2}>
        <h2 className={styles.missionTitle}> Contact Us</h2>
        <p className={styles.missionText}>
          Email: info@hoolicon.com <br />
          Contact: +254 703394794
        </p>
      </section>

      {/* Footer Section */}
      <footer className={styles.footer}>
        <p className={styles.footerText}>
          © 2024 hoolicon. All rights reserved. | <a href="/privacy-policy">Privacy Policy</a>
        </p>
      </footer>
    </div>
  );
};

export default privacy;
