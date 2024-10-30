"use client";
import Link from "next/link";
import styles from "./authLinks.module.css";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Modal from "../ParentComponent";
import WritePage from "../write/page";

const AuthLinks = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { status } = useSession();

  const handleMenuClick = () => {
    setMenuOpen(false);
  };

  const handleAddIconClick = () => {
    setModalOpen(true);
    setMenuOpen(false); // Close the menu if open
  };

  const handleBurgerClick = () => {
    setMenuOpen(!isMenuOpen);
    setModalOpen(false); // Close the modal if open
  };

  return (
    <>
      {status === "unauthenticated" ? (
        <Link href="/login" className={styles.link}>
          Login
        </Link>
      ) : (
        <>
        
          <span className={`${styles.link} ${styles.logout}`} onClick={signOut}>
            Logout
          </span>
        </>
      )}
      <div className={styles.burger} onClick={handleBurgerClick}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>
      {isMenuOpen && (
        <>
          <div className={styles.responsiveMenu}>
            <Link href="/" onClick={handleMenuClick}>Home</Link>
            <Link href="/popular" onClick={handleMenuClick}>Popular</Link>

            <Link href="/about" onClick={handleMenuClick}>About</Link>
            <Link href="/careers" onClick={handleMenuClick}>Careers</Link>
            <Link href="/agreement" onClick={handleMenuClick}>User Agreement</Link>
            <Link href="/privacy" onClick={handleMenuClick}>Privacy Policy</Link>

            <Link href="/about" onClick={handleMenuClick}>Contact</Link>

            {status === "unauthenticated" ? (
              <Link className={styles.logout2}  href="/login" onClick={handleMenuClick}>Login</Link>
            ) : (
              <>
                <span className={styles.logout2} onClick={signOut}>
                  Logout
                </span>
              </>
            )}
          </div>
          <div className={styles.overlay} onClick={handleMenuClick}>


          </div>
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
