import React from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faFire, faCompass } from "@fortawesome/free-solid-svg-icons";
import styles from "./SidebarcategoryList.module.css";

const DynamicButtons = () => {
  const router = useRouter();

  return (
    <>
      <button
        className={`${styles.button} ${router.pathname === "/" && styles.active}`}
        onClick={() => router.push("/")}
      >
        <FontAwesomeIcon icon={faHome} className={styles.icon} />
        Home
      </button>
      <button
        className={`${styles.button} ${router.pathname === "/popular" && styles.active}`}
        onClick={() => router.push("/popular")}
      >
        <FontAwesomeIcon icon={faFire} className={styles.icon} />
        Popular
      </button>
      <button
        className={`${styles.button} ${router.pathname === "/explore" && styles.active}`}
        onClick={() => router.push("/explore")}
      >
        <FontAwesomeIcon icon={faCompass} className={styles.icon} />
        Explore
      </button>
    </>
  );
};

export default DynamicButtons;
