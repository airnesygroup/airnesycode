import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./menuPosts.module.css";

const MenuPosts = ({ item, withImage }) => {
  return (
    <div className={styles.items}>
      <Link href={`/posts/${item.slug}`} className={styles.item} key={item.slug}>
        {withImage && (
          <div className={styles.imageContainer}>
            <Image src="/profile.png" alt={item.title} fill className={styles.image} />
          </div>
        )}
        <div className={styles.textContainer}>
          <h3 className={styles.postTitle}>{item.title.substring(0, 60)}</h3>
          <div className={styles.detail}>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MenuPosts;
