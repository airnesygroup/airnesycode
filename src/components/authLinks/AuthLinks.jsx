"use client";
import Link from "next/link";
import styles from "./authLinks.module.css";
import { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import Modal from "../ParentComponent";
import WritePage from "../write/page";
import ThemeToggle from "../themeToggle/ThemeToggle";
import { FaUser, FaCog, FaCrown, FaSignInAlt, FaSignOutAlt, FaPlus, FaEllipsisV } from "react-icons/fa";

const AuthLinks = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { status } = useSession();

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMenuOpen]);

  const handleMenuClick = () => {
    setMenuOpen(false);
  };

  const handleAddIconClick = () => {
    setModalOpen(true);
    setMenuOpen(false);
  };

  const handleDotsClick = () => {
    setMenuOpen(!isMenuOpen);
    setModalOpen(false);
  };

  return (
    <>
      {status === "unauthenticated" ? (
        <Link href="/login" className={styles.link}>
          <FaSignInAlt className={styles.icon} /> Log in
        </Link>
      ) : (
        <span className={`${styles.link} ${styles.logout}`} onClick={signOut}>
          <FaSignOutAlt className={styles.icon} /> Log out
        </span>
      )}

      <button className={styles.button2} onClick={handleAddIconClick}>
        <FaPlus className={styles.icon} />
      </button>

      <div className={styles.dots} onClick={handleDotsClick}>
        <FaEllipsisV className={styles.icon} />
      </div>

      {isMenuOpen && (
        <>
          <div className={styles.popupMenu}>
            <Link href="/" onClick={handleMenuClick}>
              <FaUser className={styles.icon} /> Profile
            </Link>
            <Link href="/" onClick={handleMenuClick}>
              <FaCog className={styles.icon} /> Settings
            </Link>
            <Link href="/" onClick={handleMenuClick}>
              <FaCrown className={styles.icon} /> Premium
            </Link>
            {status === "unauthenticated" ? (
              <Link className={styles.logout2} href="/login" onClick={handleMenuClick}>
                <FaSignInAlt className={styles.icon} /> Login
              </Link>
            ) : (
              <span className={styles.logout2} onClick={signOut}>
                <FaSignOutAlt className={styles.icon} /> Log out
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
