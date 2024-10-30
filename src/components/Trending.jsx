"use client";

import React, { useEffect, useState } from "react";
import styles from "./Trending.module.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const Trending = () => {
  const [profileImages, setProfileImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false); // Initially hidden
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await fetch("https://www.airnesy.com/api/postsimg?page=1&cat=");
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        const images = data.posts.slice(0, 3).map(post => post.user.image);
        setProfileImages(images);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (error) return <p>Error: {error}</p>;

  return (
    <div className={`${styles.trending} ${isVisible ? styles.visible : styles.hidden}`}>
      <FontAwesomeIcon
        icon={faArrowUp}
        className={styles.arrow}
        onClick={handleScrollToTop}
      />
      <Link href="/popular">
        <div className={styles.imagesContainer}>
          {profileImages.map((src, index) => (
            <div className={styles.imageWrapper} key={index}>
              <Image src={src} alt={`Profile ${index + 1}`} width={28} height={28} />
            </div>
          ))}
        </div>
        <span className={styles.text}>Trends</span>
      </Link>
    </div>
  );
};

export default Trending;
