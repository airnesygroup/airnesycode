import React from 'react';
import styles from './careersPage.module.css';

const Careers = () => {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
  <h1 className={styles.heroTitle}> Careers</h1>
  <p className={styles.heroSubtitle}>Jobs and Opportunities</p>
</section>

{/* Mission Statement Section */}
<section className={styles.mission}>

  
  <h2 className={styles.missionTitle}>Current Hiring Status</h2>
  <p className={styles.missionText}>
    Right now, we don’t have any open positions, but we’re always excited to meet passionate individuals who want to be part of our journey. We’re a young startup with a lot of potential and limited cash flow, so we can't offer paid positions at the moment. However, we welcome anyone interested in joining us for unpaid opportunities. Keep an eye out, as we might have openings coming soon!
  </p>
</section>


      <section className={styles.mission2}>


      <h2 className={styles.missionTitle}> Contact Us</h2>
  <p className={styles.missionText}>
  Email: info@hoolicon.com <br />
  contact: +254 703394794
  </p>



      
      </section>
      {/* Footer Section */}
      <footer className={styles.footer}>
        <p className={styles.footerText}>
          © 2024 hoolicon. All rights reserved. | <a href="/privacy">Privacy Policy</a>
        </p>
      </footer>
    </div>
  );
};

export default Careers;
