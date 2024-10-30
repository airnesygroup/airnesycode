"use client";

import React, { useContext, useState, useEffect } from "react";
import styles from "./navbar.module.css";
import Link from "next/link";
import AuthLinks from "../authLinks/AuthLinks";
import ThemeToggle from "../themeToggle/ThemeToggle";
import { ThemeContext } from "@/context/ThemeContext";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon as faMoonRegular } from "@fortawesome/free-regular-svg-icons";
import AddIcon2 from "../Addicon2";
const Navbar = () => {
  const { toggle, theme } = useContext(ThemeContext);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const containerStyle = theme === "dark"
    ? { backgroundColor: "rgba(1, 1, 2, 0.7)" }
    : { backgroundColor: "rgba(252, 254, 255, 0.7)" };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (window.innerWidth < 720) {
        if (currentScrollY > lastScrollY) {
          setShowNavbar(false); // Scrolling down, hide navbar
        } else {
          setShowNavbar(true); // Scrolling up, show navbar
        }
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div
      className={`${styles.container} ${showNavbar ? styles.show : styles.hide}`}
      style={containerStyle}
    >
   

      <div className={styles.wrapper}>
        <Link href="/">
          <div className={styles.logo}>
            <Image src="/logo1.png" alt="hoolicon logo" layout="fill" className={styles.logoImage} />
            <h1 className={styles.logoText}>hoolicon</h1>

          </div>
        </Link>
        <Link href="/">
          <div className={styles.logo}>
            <h1 className={styles.logoText}></h1>
          </div>
        </Link>
        <Link href="/">
          <div className={styles.logo}>
            <h1 className={styles.logoText}></h1>
          </div>
        </Link>     <Link href="/">
          <div className={styles.logo}>
            <h1 className={styles.logoText}></h1>
          </div>
        </Link>     <Link href="/">
          <div className={styles.logo}>
            <h1 className={styles.logoText}></h1>
          </div>
        </Link>     <Link href="/">
          <div className={styles.logo}>
            <h1 className={styles.logoText}></h1>
          </div>
        </Link>
        <div className={styles.searchContainer}>
          <input 
            type="text" 
            placeholder="Search..." 
            className={styles.searchBar} 
          />
        </div>
        <div className={styles.links}>
          <div 
            className={styles.theme}
            onClick={toggle}
          >
                   <FontAwesomeIcon icon={faMoonRegular}  size="sm"  className={styles.themeImage} />
          </div>



     
          <AuthLinks />
        </div>
        
      </div>

    </div>
    
  );
};

export default Navbar;