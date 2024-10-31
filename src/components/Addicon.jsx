"use client";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Modal from "./ParentComponent";
import WritePage from "./write/page";
import { useSession } from "next-auth/react"; // Import useSession
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import styles from "./AddIcon.module.css";

const AddIcon = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const { status } = useSession(); // Access session status
  const router = useRouter(); // Initialize the router

  const handleAddIconClick = () => {
    if (status === "unauthenticated") {
      // Redirect to login page if not authenticated
      router.push("/login"); // Change this to your login page route
    } else {
      // Open modal if authenticated
      setModalOpen(true);
    }
  };

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <button
        className={`${styles.addIcon} ${!isVisible ? styles.hidden : ""}`}
        onClick={handleAddIconClick}
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>
      {isModalOpen && (
        <Modal open={isModalOpen} onClose={() => setModalOpen(false)}>
          <WritePage closeModal={() => setModalOpen(false)} />
        </Modal>
      )}
    </>
  );
};

export default AddIcon;
