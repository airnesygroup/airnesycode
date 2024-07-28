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
          <button className={styles.addIcon} onClick={handleAddIconClick}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
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
            <Link href="/" onClick={handleMenuClick}>Homepage</Link>
            <Link href="/" onClick={handleMenuClick}>About</Link>
            <Link href="/" onClick={handleMenuClick}>Contact</Link>
            {status === "unauthenticated" ? (
              <Link href="/login" onClick={handleMenuClick}>Login</Link>
            ) : (
              <>
                <Link href="/write" onClick={handleMenuClick}>Write</Link>
                <span className={styles.link} onClick={signOut}>
                  Logout
                </span>
              </>
            )}
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
