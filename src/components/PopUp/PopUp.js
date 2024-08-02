
// components/PopUp.js
import React, { useEffect, useRef } from 'react';
import styles from './PopUp.module.css';
import { useRouter } from 'next/router';

const PopUp = ({ closePopUp }) => {
  const router = useRouter();
  const modalContentRef = useRef(null);

  const handleClickOutside = (event) => {
    if (modalContentRef.current && !modalContentRef.current.contains(event.target)) {
      closePopUp();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent} ref={modalContentRef}>
        <button className={styles.closeButton} onClick={closePopUp}>
          &times;
        </button>
        <h1>Welcome to Our App</h1>
        <h2>Your Title Here</h2>
        <p>Your description here...</p>
        <button className={styles.loginButton} onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default PopUp;