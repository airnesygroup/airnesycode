// CarouselListClient.js
"use client"; // Add this line at the top

import React, { useRef } from "react";
import styles from "./carouselList.module.css";
import Carousel from "../carousel/Carousel";

const CarouselListClient = ({ posts }) => {
  const carouselRef = useRef(null);

  const handleScroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -carouselRef.current.offsetWidth : carouselRef.current.offsetWidth;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.posts} ref={carouselRef}>
        {posts.map((item) => (
          item.img && (
            <div key={item.id} className={styles.carouselItem}>
              <Carousel item={item} />
            </div>
          )
        ))}
      </div>
      <button
        className={`${styles.chevron} ${styles.right}`}
        onClick={() => handleScroll("right")}
      >
        <span className={styles.chevronIcon}>{">"}</span>
      </button>
    </div>
  );
};

export default CarouselListClient;
