"use client";

import React, { useEffect, useState } from "react";
import styles from "./categoryList.module.css";
import Link from "next/link";
import Image from "next/image";

// Define the getData function at the top
const getData = async () => {
  try {
    const res = await fetch("https://www.airnesy.com/api/categories", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }

    const data = await res.json();
    console.log("Fetched categories:", data); // Log fetched data
    return data;
  } catch (err) {
    console.error("Error fetching data:", err);
    throw err;
  }
};

// CategoryList component
const CategoryList = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories = await getData();
        console.log("Categories in component:", categories); // Log categories in component
        setData(categories);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data || data.length === 0) {
    return <div>No categories found</div>;
  }

  return (
    <div className={styles.container}>
   
      <div className={styles.categories}>
        {data.map((item) => (
          <Link
            href={`/blog?cat=${item.slug}`}
            className={`${styles.category} ${styles[item.slug]}`}
            key={item._id}
          >
            {item.img && (
           <Image
           src={item.img}
           alt={item.title}
           width={32}
           height={32}
           className={styles.image}
         />
         
            )}
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
