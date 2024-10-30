"use client";

import React, { useContext, useEffect, useState } from "react";
import styles from "./Controls.module.css";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "@/context/ThemeContext";

const Controls = () => {
  const { theme } = useContext(ThemeContext);
  const router = useRouter();
  const [showControls, setShowControls] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlVisibility = () => {
    if (window.scrollY > lastScrollY) {
      setShowControls(false);  // Hide on scroll down
    } else {
      setShowControls(true);   // Show on scroll up
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlVisibility);
    return () => {
      window.removeEventListener("scroll", controlVisibility);
    };
  }, [lastScrollY]);

  return (
    <div className={`${styles.controls} ${showControls ? styles.show : styles.hide}`}>
      <button
        className={`${styles.controlButton} ${router.pathname === "/" ? styles.active : ""}`}
        onClick={() => router.push("/")}
      >
        <FontAwesomeIcon icon={faHome} className={styles.icon} />
        <span></span>
      </button>
      
      <button
        className={`${styles.controlButton} ${router.pathname === "/explore" ? styles.active : ""}`}
        onClick={() => router.push("/explore")}
      >
        <FontAwesomeIcon icon={faSearch} className={styles.icon} />
        <span></span>
      </button>

      <button
        className={`${styles.controlButton} ${router.pathname === "/profile" ? styles.active : ""}`}
        onClick={() => router.push("/profile")}
      >
        <FontAwesomeIcon icon={faUser} className={styles.icon} />
        <span></span>
      </button>
    </div>
  );
};

export default Controls;
