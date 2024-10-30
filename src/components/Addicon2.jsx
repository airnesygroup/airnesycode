"use client";
import { useState } from "react";
import Modal from "./ParentComponent";
import WritePage from "./write/page";
import { useSession } from "next-auth/react"; // Import useSession
import styles from "./AddIcon2.module.css";

const AddIcon2 = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { status } = useSession(); // Access session status

  const handleComponentClick = () => {
    setModalOpen(true);
  };

  // Render nothing if the user is unauthenticated
  if (status === "unauthenticated") return null;

  return (
    <>

    
<button
        className={styles.addButton} onClick={handleComponentClick}>

        
        <Add className={styles.icon} fontSize="medium" />
        <span className={styles.buttonText2}> Create a post</span>
      </button>
      
  
      {isModalOpen && (
        <Modal open={isModalOpen} onClose={() => setModalOpen(false)}>
          <WritePage closeModal={() => setModalOpen(false)} />
        </Modal>
      )}
    </>
  );
};

export default AddIcon2;
