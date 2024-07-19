import Link from "next/link";
import React from "react";
import styles from "./menuCategories.module.css";

const MenuCategories = () => {
  return (
    <div className={styles.categoryList}>
      <Link
        href="/blog?cat=news"
        className={`${styles.categoryItem} ${styles.news}`}
      >
       News
      </Link>
      <Link href="/blog?cat=business" className={`${styles.categoryItem} ${styles.business}`}>
        Business
      </Link>
      <Link href="/blog?cat=technology" className={`${styles.categoryItem} ${styles.technology}`}>
        Technology
      </Link>
      <Link href="/blog?cat=sports" className={`${styles.categoryItem} ${styles.sports}`}>
        Sports      </Link>
        <Link href="/blog?cat=gaming" className={`${styles.categoryItem} ${styles.gaming}`}>
        Gaming
      </Link>
      <Link href="/blog?cat=entertainment" className={`${styles.categoryItem} ${styles.entertainment}`}>
        Entertainment      </Link>
   
    </div>
  );
};

export default MenuCategories;
