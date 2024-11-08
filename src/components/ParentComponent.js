import { useEffect } from "react";
import WritePage from "./write/page";
import styles from "./ParentComponent.module.css"; // Import the CSS module for the parent component

const Modal = ({ open, onClose, children }) => {
  useEffect(() => {
    if (open) {
      // Disable scrolling when the modal is open
      document.body.style.overflow = "hidden";
    } else {
      // Re-enable scrolling when the modal is closed
      document.body.style.overflow = "auto";
    }

    // Clean up the effect when the component is unmounted or modal is closed
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

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
