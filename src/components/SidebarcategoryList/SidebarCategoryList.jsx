
"use client";

import React, { useContext, useEffect, useState } from "react";
import styles from "./SidebarcategoryList.module.css";
import Link from "next/link";
import AddIcon2 from "../Addicon2";
import { useRouter } from "next/navigation";
import AddIcon from "../Addicon";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  Add,
  StarBorder,
  InfoOutlined, 
  WorkOffOutlined, 
  ShieldOutlined, 
  PublicOutlined,
  GavelOutlined, 
  BusinessCenterOutlined, // Business Icon
  AttachMoneyOutlined, // Money Icon
  ComputerOutlined, // Tech Icon
  CodeOutlined // Coding Icon
} from "@mui/icons-material";
import { faGlobe as regularGlobe } from '@fortawesome/free-regular-svg-icons';
import { faLaptop as regularLaptop } from '@fortawesome/free-regular-svg-icons';

import { ThemeContext } from "@/context/ThemeContext";


import { 
  faStar as faStarRegular, 
  faCompass as faCompassRegular,
 
} from "@fortawesome/free-regular-svg-icons";

import { faChevronDown, faGlobe, faGlobeAfrica, faLaptop } from "@fortawesome/free-solid-svg-icons";

// Example of using the icons in a component

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
        className={`${styles.sidebarButton} ${styles.home} ${router.pathname === "/" ? styles.active : ""}`}
        onClick={() => router.push("/")}
      >
        <Image
          src={theme === "light" ? "/home2.png" : "/home.png"} // Adjust icon paths based on theme
          alt="home"
          className={styles.icon}
          height={23}
          width={23}
        />
            <span className={styles.buttonText}>Home </span>
      </button>
      <button
        className={`${styles.sidebarButton} ${router.pathname === "/popular" ? styles.active : ""}`}
        onClick={() => router.push("/popular")}
      >
        
        <FontAwesomeIcon icon={faStarRegular} className={styles.icon} size="xl" />    
          Popular 

        <span className={styles.chevron2}> <FontAwesomeIcon icon={faChevronDown}  size="2xs" /></span>
      </button>

      <button
        className={`${styles.sidebarButton} ${router.pathname === "/hooliconnews" ? styles.active : ""}`}
        onClick={() => router.push("/hooliconnews")}
      >
        
        <FontAwesomeIcon icon={faGlobeAfrica} className={styles.icon} size="xl" />    
        Hoolicon Biz
        <span className={styles.chevron2}> <FontAwesomeIcon icon={faChevronDown}  size="2xs" /></span>
      </button>

      <button
        className={`${styles.sidebarButton} ${router.pathname === "/hooliconnews" ? styles.active : ""}`}
        onClick={() => router.push("/hooliconnews")}
      >
        
        <FontAwesomeIcon icon={faLaptop} className={styles.icon}  size="lg" />    
        Hoolicon Tech

        <span className={styles.chevron2}> <FontAwesomeIcon icon={faChevronDown}  size="2xs" /></span>
      </button>



   
      <div className={styles.separator}></div>
      


      <div className={styles.sectionTitle}>CREATE POST</div>

      <AddIcon2/>

     <div className={styles.separator}></div>







      <div className={styles.sectionTitle}>CATEGORIES</div>

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
              height={27}
              width={27}
            />
            <span className={styles.icon2}>{item.title}</span>
            <span className={styles.chevron3}> <FontAwesomeIcon icon={faStarRegular}  size="xs" /></span>
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

      <div className={styles.sectionTitle}>RESOURCES</div>
      <button
        className={`${styles.sidebarButton} ${router.pathname === "/about" ? styles.active : ""}`}
        onClick={() => router.push("/about")}
      >
        <InfoOutlined className={styles.icon} size="md" />
        <span className={styles.buttonText}>About Hoolicon</span>

      </button>

      <button
        className={`${styles.sidebarButton} ${router.pathname === "/careers" ? styles.active : ""}`}
        onClick={() => router.push("/careers")}
      >
        <WorkOffOutlined className={styles.icon} size="md" />
        <span className={styles.buttonText}>Careers</span>


      </button>

      <button
        className={`${styles.sidebarButton} ${router.pathname === "/privacy" ? styles.active : ""}`}
        onClick={() => router.push("/privacy")}
      >
        <ShieldOutlined className={styles.icon} size="md" />
        <span className={styles.buttonText}>  Privacy Policy</span>

      </button>
      <button
        className={`${styles.sidebarButton} ${router.pathname === "/agreement" ? styles.active : ""}`}
        onClick={() => router.push("/agreement")}
      >
        <GavelOutlined className={styles.icon} size="md" />
        <span className={styles.buttonText}> User Agreement </span>

      </button>
      

    </div>
  );
};

export default SidebarCategoryList;


