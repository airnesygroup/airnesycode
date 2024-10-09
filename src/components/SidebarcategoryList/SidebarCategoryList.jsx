"use client";

import React, { useContext, useEffect, useState } from "react";
import styles from "./SidebarcategoryList.module.css";
import Link from "next/link";
import AddIcon2 from "../Addicon2";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ThemeContext } from "@/context/ThemeContext";

const getData = async () => {
  try {
    const res = await fetch("https://www.airnesy.com/api/categories", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching data:", err);
    throw err;
  }
};

const SidebarCategoryList = () => {
  const { theme } = useContext(ThemeContext);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [showAllCategories, setShowAllCategories] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories = await getData();
        setData(categories);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  const toggleDropdown = (slug) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [slug]: !prev[slug],
    }));
  };

  const displayedCategories = showAllCategories ? data : data.slice(0, 10);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data || data.length === 0) {
    return <div>No categories found</div>;
  }

  return (
    <div className={styles.wrapper}>
      <button
        className={`${styles.sidebarButton} ${router.pathname === "/" ? styles.active : ""}`}
        onClick={() => router.push("/")}
      >
        <Image
          src={theme === "light" ? "/home2.png" : "/home.png"} // Adjust icon paths based on theme
          alt="home"
          className={styles.icon}
          height={25}
          width={25}
        />
        Home
      </button>
      <button
        className={`${styles.sidebarButton} ${router.pathname === "/" ? styles.active : ""}`}
        onClick={() => router.push("/")}
      >
        <Image
          src={"/bg.png"}      
         alt="home"
          className={styles.icon}
          height={25}
          width={25}
        />
        Home
      </button>
      
      {displayedCategories.map((item) => (
        <div key={item._id} className={styles.categoryWrapper}>
          <button
            className={`${styles.categoryButton} ${router.pathname === `/blog?cat=${item.slug}` ? styles.active : ""}`}
            onClick={() => router.push(`/blog?cat=${item.slug}`)}
          >
            <Image
              src={item.icon} // Use image icon from category data
              alt={item.title}
              className={styles.icon}
              height={25}
              width={25}
            />
            <span className={styles.icon2}>{item.title}</span>
            <span className={styles.chevron2}>⌄</span>
          </button>
          {openDropdowns[item.slug] && (
            <div className={styles.subcategories}>
              {item.subcategories.map((sub) => (
                <Link
                  href={`/blog?cat=${sub.slug}`}
                  className={styles.subcategory}
                  key={sub._id}
                >
                  {sub.title}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
      {data.length > 10 && (
        <button
          className={styles.showMoreButton}
          onClick={() => setShowAllCategories((prev) => !prev)}
        >
          {showAllCategories ? "Show Less" : "Show More"}
        </button>
      )}
      <div className={styles.separator}></div>
      <AddIcon2 />
      <div className={styles.separator}></div>

      <div className={styles.sectionTitle}>RESOURCES</div>
      {/* Additional Sidebar Buttons... */}
    </div>
  );
};

export default SidebarCategoryList;
