"use client";

import React, { useEffect, useState } from "react";
import styles from "./SidebarcategoryList.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarRegular, faCompass as faCompassRegular,  faHospital as faHospitalRegular } from "@fortawesome/free-regular-svg-icons";
import { faInfoCircle, faBriefcase, faUserShield, faFileContract } from "@fortawesome/free-solid-svg-icons";

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
            <Image src="/home2.png" alt="home"  className={styles.icon} height={25} width={25} />
        Home
      </button>
      <button
        className={`${styles.sidebarButton} ${router.pathname === "/popular" ? styles.active : ""}`}
        onClick={() => router.push("/popular")}
      >
            <Image src="/popular.png" alt="popular"   className={styles.icon}  height={25} width={25} />
        Popular
      </button>
      <button
        className={`${styles.sidebarButton} ${router.pathname === "/explore" ? styles.active : ""}`}
        onClick={() => router.push("/explore")}
      >
            <Image src="/explore.png" alt="explore"    className={styles.icon} height={25} width={25} />
        Explore
      </button>
      <div className={styles.separator}></div>
      <div className={styles.sectionTitle}>Categories</div>
      {displayedCategories.map((item) => (
        <div key={item._id} className={styles.categoryWrapper}>
          <button
            className={styles.categoryButton}
            onClick={() => router.push(`/blog?cat=${item.slug}`)}
          >
            {item.title}
            <span
              className={styles.chevron}
              onClick={(e) => {
                e.stopPropagation();
                toggleDropdown(item.slug);
              }}
            >
              ▼
            </span>
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
      <div className={styles.sectionTitle}>Resources</div>
      <Link href="/about" className={styles.sidebarLink}>
      <Image src="/about.png" alt="about"    className={styles.icon} height={25} width={25} />
        About Us
      </Link>
      <Link href="/careers" className={styles.sidebarLink}>
      <Image src="/careers.png" alt="careers"    className={styles.icon} height={25} width={25} />
        Careers
      </Link>
      <Link href="/privacy-policy" className={styles.sidebarLink}>
      <Image src="/privacy.png" alt="privacy"    className={styles.icon} height={25} width={25} />
        Privacy Policy
      </Link>
                             
    </div>
  );
};

export default SidebarCategoryList;
