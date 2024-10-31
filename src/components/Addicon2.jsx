"use client";
import { useState } from "react";
import Modal from "./ParentComponent";
import WritePage from "./write/page";
import { useSession } from "next-auth/react"; // Import useSession
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import styles from "./AddIcon2.module.css";
import { Add } from "@mui/icons-material";

const AddIcon2 = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { status } = useSession(); // Access session status
  const router = useRouter(); // Initialize the router

  const handleComponentClick = () => {
    if (status === "authenticated") {
      setModalOpen(true); // Open modal if authenticated
    } else {
      router.push("/login"); // Redirect to signup page if not authenticated
    }
  };

  return (
    <>
      <button className={styles.addButton} onClick={handleComponentClick}>
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
