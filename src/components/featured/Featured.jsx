import React from "react";
import styles from "./featured.module.css";
import Image from "next/image";
import Link from "next/link";

const Featured = () => {
  return (
    <div className={styles.container}>
      <div className={styles.post}>
        <div className={styles.textContainer}>
          <h1 className={styles.postTitle}><b>Welcome to</b> Trello.</h1>
          <h5 className={styles.postTitle}> Tell your story</h5>
          <p className={styles.postDesc}>
           We are a stream-blog community based social platform,
       where users can create posts, publish communities and interact weith others on a live preview. 
          </p>
          <div className={styles.buttonContainer}>
            <Link href="/login">
              <button className={styles.button}>Sign up</button>
            </Link>
          </div>
        </div>
        <div className={styles.imgContainer}>
          <Image src="/culture.png" alt="" fill className={styles.image} />
        </div>
      </div>
    </div>
  );
};

export default Featured;

    
        