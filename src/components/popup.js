"use client";

import React from 'react';
import styles from "./PopUp.module.css"; // Ensure the file name matches
import Link from 'next/link';
import Image from "next/image";


const Popup = ({ onClose }) => {
  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContent}>
        <button className={styles.closeButton} onClick={onClose}>X</button>
        <div className={styles.logo}>
            <Image src="/logo3.png"  layout="fill" className={styles.logoImage} />
          </div>
        <h2 className={styles.title}>Tell your story!</h2>
        <p className={styles.description}>We are a community based blog-streaming social platform, 
          where users can create posts, publish communities and interact with others on a live preview.</p>
        <p className={styles.description3}>Create an account and share your stories now!</p>
        <p className={styles.description3}>Join us on our journey or GET IN TOUCH with us through our email</p>
        <p className={styles.description2}>esy.info@gmail.com</p>
        <div className={styles.buttonContainer}>
          <button className={styles.button}>
            <Link href="/login">
              Sign up
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;

