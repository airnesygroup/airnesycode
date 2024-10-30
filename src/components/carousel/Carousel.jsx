import React from "react";
import styles from "./carousel.module.css";
import Link from "next/link";
import Image from "next/image";

const Carousel = ({ item }) => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Link href={`/posts/${item.slug}`} passHref>
          <Image src={item.img} alt={item.title} className={styles.image} layout="fill" objectFit="cover" />
       
        <div className={styles.textOverlay}>           

          <Link href={`/posts/${item.slug}`}>
            <h1 className={styles.title}>{item.title.substring(0, 60)}</h1>
          <div className={styles.desc} dangerouslySetInnerHTML={{ __html: item.desc.substring(0, 60) }} />
          <div className={styles.userProfile}>
            <Image src={item.user?.image} alt={item.user?.name} className={styles.profileImage} width={25} height={25} />
            <div className={styles.userInfo}>
              <p className={styles.username}>{item.user?.name}</p>
              <p className={styles.userRole}>{item.user?.role}</p>
            </div>
          </div> </Link>  
        </div>  </Link>
      </div>
    </div>
  );
};

export default Carousel;
