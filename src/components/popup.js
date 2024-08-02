// components/Popup.js
"use client";

import React from 'react';
import styles from "./PopUp.module.css"; // Import the CSS module for the parent component
import { useRouter } from 'next/router'; // Import useRouter from next/router

const Popup = ({ onClose }) => {
  const router = useRouter(); // Initialize the router

  const handleLogin = () => {
    router.push('/login'); // Navigate to the login page
  };

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContent}>
        <h2 className={styles.title}>Tell your story!</h2>
        <p className={styles.description}> We are a community based blog-streaming social platform, 
        where users can create posts, publish communities and interact with others on a live preview.</p>
        <p className={styles.description}> Create an account and share your  strories now!</p>
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={onClose}>Close</button>
          <button className={styles.button} onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
