"use client";

import React, { useContext } from "react";
import styles from "./navbar.module.css";
import Link from "next/link";
import AuthLinks from "../authLinks/AuthLinks";
import ThemeToggle from "../themeToggle/ThemeToggle";
import { ThemeContext } from "@/context/ThemeContext";
import Image from "next/image";

const Navbar = () => {
  const { toggle, theme } = useContext(ThemeContext);

  const containerStyle = theme === "dark" ? { backgroundColor: "#020203" } : { backgroundColor: "#fcfeff" };

  return (
    <div className={styles.container} style={containerStyle}>
      <div className={styles.wrapper}>
        <Link href="/">
          <div className={styles.logo}>
            <Image src="/logo1.png" alt="lama blog" layout="fill" className={styles.logoImage} />
            <h1 className={styles.logoText}>Airnesy</h1>
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
            <Image src="/moon.png" alt="theme toggle" layout="fill" className={styles.themeImage} />
          </div>
          <Link href="/" className={styles.link}>Communities</Link>
          <AuthLinks />
        </div>
        
      </div>

    </div>
    
  );
};

export default Navbar;
