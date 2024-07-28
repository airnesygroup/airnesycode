"use client";
import Link from "next/link";
import styles from "./authLinks.module.css";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Modal from "@/components/Modal"; // Import the modal component
import WritePage from "@/components/WritePage"; // Import the write page component

const AuthLinks = () => {
  const [open, setOpen] = useState(false);
  const { status } = useSession();

  const handleMenuClick = () => {
    setOpen(false);
  };

  return (
    <>
      {status === "unauthenticated" ? (
        <Link href="/login" className={styles.link}>
          Login
        </Link>
      ) : (
        <>
          <button className={styles.addIcon} onClick={() => setOpen(true)}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
          <span className={`${styles.link} ${styles.logout}`} onClick={signOut}>
            Logout
          </span>
        </>
      )}
      <div className={styles.burger} onClick={() => setOpen(!open)}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>
      {open && (
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
      <Modal open={open} onClose={() => setOpen(false)}>
        <WritePage />
      </Modal>
    </>
  );
};

export default AuthLinks;

