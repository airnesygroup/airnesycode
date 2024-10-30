import React from "react";
import styles from "./featured.module.css";
import Image from "next/image";
import Link from "next/link";

const Featured = () => {
  return (
    <div className={styles.container}>
      <div className={styles.post}>
        <div className={styles.textContainer}>
          <h1 className={styles.postTitle}><b>Welcome to</b> Huberman Lab.</h1>
          <h5 className={styles.postTitle}> Let's make you Healthy</h5>
          <p className={styles.postDesc}>
            The Huberman Lab blog is published by Dr. Andrew Huberman, a neuroscientist and tenured professor 
            of neurobiology and ophthalmology at Stanford School of Medicine. The blog discusses neuroscience
            and science-based tools, including how our brain and its connections with the organs of our body
            control our perceptions, our behaviors, and our health, 
            as well as existing and emerging tools for measuring and changing how our nervous system works.
          </p>
          <div className={styles.buttonContainer}>
            <Link href="/blog">
              <button className={styles.button}>Read More</button>
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

    
        