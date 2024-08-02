// components/Popup.js
"use client";

import React from 'react';
import styles from "./PopUp.module.css"; // Import the CSS module for the parent component
import Router from 'next/router';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Popup = ({ onClose }) => {
  return (
    <div className={styles.popupOverlay}>
    <div className={styles.popupContent}>
    <button className={styles.closeButton} onClick={onClose}>×</button>

      <h2 className={styles.title}>Tell your story!</h2>
      <p className={styles.description}> We are a community based blog-streaming social platform, 
      where users can create posts, publish communities and interact with others on a live preview.</p>
      <p className={styles.description3}> Create an account and share your  strories now!</p>
      <p className={styles.description3}> Join us on our jopurney or reach us out through our email</p>
      <p className={styles.description2}> airnesy.info@gmail.com</p>
      <div className={styles.buttonContainer}>
        <button className={styles.button} ><Link href="/login" >
          Sighn up
        </Link></button>
      </div>
    </div>
  </div>
  );
};

export default Popup;
