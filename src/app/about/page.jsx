import React from 'react';
import styles from './aboutPage.module.css';

const About = () => {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>About Us</h1>
        <p className={styles.heroSubtitle}>Discover what’s trending now</p>
      </section>

      {/* Mission Statement Section */}
      <section className={styles.mission}>


      <h2 className={styles.missionTitle}>Who We Are</h2>
  <p className={styles.missionText}>
    We're the place where what's hot gets even hotter. A community of trendsetters and creators,
     we're all about sharing what's happening now. Whether it's a viral moment or breaking news, we keep the conversation alive and kicking.
  </p>

  <h2 className={styles.missionTitle}>Our Mission</h2>
  <p className={styles.missionText}>
    Our mission? To make your voice heard in the buzz of what's trending. 
    We’re here to turn every comment into a conversation and every share into something bigger.
     Let’s keep the energy up and the connections strong—together, we make trends happen.
  </p>

      
      </section>

      {/* Team Section */}
      <section className={styles.team}>
        <h2 className={styles.teamTitle}>Meet the Team</h2>
        <div className={styles.teamMembers}>
          <div className={styles.teamMember}>
            <img src="/alex1.png" alt="Team Member 1" className={styles.teamImage} />
            <h3 className={styles.teamName}>Mbelenzi Alexander</h3>
            <p className={styles.teamRole}>CEO & Founder</p>
          </div>
    
       
        </div>
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

export default About;
