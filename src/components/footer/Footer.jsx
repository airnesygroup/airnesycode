import React from "react";
import styles from "./footer.module.css";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
      <Link href="/">
          <div className={styles.logo}>
            <Image src="/logo1.png" alt="lama blog" layout="fill" className={styles.logoImage} />
            <h1 className={styles.logoText}>Airnesy</h1>
          </div>
        </Link>
        <p className={styles.desc}>
      Tell your story! Welcome to Airnesy, we are a stream-blog community based social platform,
       where users can create posts, publish communities and interact weith others on a live preview. 
        </p>
    
      </div>
      <div className={styles.links}>
        <div className={styles.list}>
          <span className={styles.listTitle}>Top </span>
          <Link href="/blog?cat=politics">politics</Link>
          <Link href="/blog?cat=news">news</Link>
          <Link href="/blog?cat=technology">technology</Link>
          <Link href="/blog?cat=business">business</Link>
        </div>
        <div className={styles.list}>
          <span className={styles.listTitle}>Tags</span>
          <Link href="/blog?cat=well-health">About</Link>
          <Link href="/blog?cat=entertainment">Privacy Policy</Link>
          <Link href="/blog?cat=movies">User Agreement</Link>
        </div>
        <div className={styles.list}>
          <span className={styles.listTitle}>Social</span>
          <Link href="https://www.tiktok.com/@Airnesy">Tiktok </Link>
          <Link href="https://www.youtube.com/@Airnesy">Youtube </Link>

        </div>
      </div>
    </div>
  );
};

export default Footer;
