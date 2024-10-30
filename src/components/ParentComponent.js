import { useState } from "react";
import WritePage from "./write/page";
import styles from "./ParentComponent.module.css"; // Import the CSS module for the parent component

const Modal = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
