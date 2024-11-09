"use client";
import Link from "next/link";
import styles from "./authLinks.module.css";
import { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import Modal from "../ParentComponent";
import WritePage from "../write/page";
import ThemeToggle from "../themeToggle/ThemeToggle";

const AuthLinks = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { status } = useSession();

  // Effect to manage body overflow when the menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'; // Disable scrolling
    } else {
      document.body.style.overflow = 'auto'; // Enable scrolling
    }
  }, [isMenuOpen]);

  const handleMenuClick = () => {
    setMenuOpen(false);
  };

  const handleAddIconClick = () => {
    setModalOpen(true);
    setMenuOpen(false); // Close the menu if open
  };

  const handleDotsClick = () => {
    setMenuOpen(!isMenuOpen);
    setModalOpen(false); // Close the modal if open
  };

  return (
    <>
      {status === "unauthenticated" ? (
        <Link href="/login" className={styles.link}>
          Log in
        </Link>
      ) : (
        <span className={`${styles.link} ${styles.logout}`} onClick={signOut}>
          Log out
        </span>
      )}
      <button className={styles.button2}>

      <div className={styles.dots} onClick={handleDotsClick}>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
      </div>
      </button>

      {isMenuOpen && (
        <>
          <div className={styles.popupMenu}>
          <Link href="/" onClick={handleMenuClick}>Profile</Link>
            <Link href="/" onClick={handleMenuClick}>Settings</Link>
            <Link href="/" onClick={handleMenuClick}>Premium</Link>
            {status === "unauthenticated" ? (
              <Link className={styles.logout2} href="/login" onClick={handleMenuClick}>Login</Link>
            ) : (
              <span className={styles.logout2} onClick={signOut}>
                Log out
              </span>
            )}

<div style={{ display: 'flex', alignItems: 'center' }}>
  <span style={{ marginRight: '40px' }}>Theme</span>
  <ThemeToggle />
</div>



          </div>
          <div className={styles.overlay} onClick={handleMenuClick}></div>
        </>
      )}
      {isModalOpen && (
        <Modal open={isModalOpen} onClose={() => setModalOpen(false)}>
          <WritePage closeModal={() => setModalOpen(false)} />
        </Modal>
      )}
    </>
  );
};

export default AuthLinks;
