// components/popup/Popup.js

import styles from ".PopUp.module.css";

const Popup = ({ onClose }) => {
  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContent}>
        <h2 className={styles.title}>Welcome</h2>
        <p className={styles.description}>This is a description of the popup.</p>
        <button className={styles.button} onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Popup;
