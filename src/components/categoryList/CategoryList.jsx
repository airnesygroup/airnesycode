"use client";

import React, { useEffect, useState, useRef } from "react";
import styles from "./categoryList.module.css";
import Link from "next/link";

const getData = async () => {
  try {
    const res = await fetch("https://www.airnesy.com/api/categories", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }

    const data = await res.json();
    console.log("Fetched categories:", data);
    return data;
  } catch (err) {
    console.error("Error fetching data:", err);
    throw err;
  }
};

const CategoryList = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories = await getData();
        console.log("Categories in component:", categories);
        setData(categories);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  const handleScroll = (direction) => {
    if (containerRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data || data.length === 0) {
    return <div>No categories found</div>;
  }

  return (
    <div className={styles.wrapper}>
      <button
        className={`${styles.scrollButton} ${styles.left}`}
        onClick={() => handleScroll("left")}
      >
        &lt;
      </button>
      <div className={styles.container} ref={containerRef}>
        <div className={styles.categories}>
          {data.map((item) => (
            <Link
              href={`/blog?cat=${item.slug}`}
              className={`${styles.category} ${styles[item.slug]}`}
              key={item._id}
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
      <button
        className={`${styles.scrollButton} ${styles.right}`}
        onClick={() => handleScroll("right")}
      >
        &gt;
      </button>
    </div>
  );
};

export default CategoryList;
