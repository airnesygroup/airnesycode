import Link from "next/link";
import React from "react";
import styles from "./menuCategories.module.css";

const MenuCategories = () => {
  return (
    <div className={styles.categoryList}>
      <Link
        href="/blog?cat=well-being"
        className={`${styles.categoryItem} ${styles.style}`}
      >
       Well-being
      </Link>
      <Link href="/blog?cat=mental" className={`${styles.categoryItem} ${styles.fashion}`}>
        Mental
      </Link>
      <Link href="/blog?cat=sleep" className={`${styles.categoryItem} ${styles.food}`}>
        Sleep
      </Link>
      <Link href="/blog?cat=nutrition" className={`${styles.categoryItem} ${styles.travel}`}>
        Nutrition
      </Link>
      <Link href="/blog?cat=fitness" className={`${styles.categoryItem} ${styles.culture}`}>
        Fitness
      </Link>
      <Link href="/blog?cat=memory" className={`${styles.categoryItem} ${styles.coding}`}>
       Memory
      </Link>
    </div>
  );
};

export default MenuCategories;
