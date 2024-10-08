"use client";

import React, { useContext, useEffect, useState } from "react";
import styles from "./SidebarcategoryList.module.css";
import Link from "next/link";
import AddIcon2 from "../Addicon2";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarRegular, faCompass as faCompassRegular } from "@fortawesome/free-regular-svg-icons";
import { InfoOutlined, WorkOffOutlined, ShieldOutlined,  GavelOutlined }from "@mui/icons-material";
import { ThemeContext } from "@/context/ThemeContext";
import {
  faCircle,
  faNewspaper,
  faRobot,
  faGamepad,
  faFilm,
  faVrCardboard,
  faCoins,
  faGlasses,
  faPrint,
  faPiggyBank,
  faWatch,
  faBullhorn,
  faShoppingCart,
  faBrain,
  faDatabase,
  faCode,
  faCloud,
  faAtom,
  faLock,
  faWifi,
  faNetworkWired,
  faTshirt,
  faUtensils,
  faBolt,
  faDesktop,
  faCar,
  faRocket,
  faBatteryHalf,
  faFlask,
  faSquareRootAlt,
  faDna,
  faMapMarkedAlt,
  faCogs,
  faindustry,
  faHammer,
  faHeartbeat,
  faSeedling,
  faLeaf,
  faAnchor,
  faFighterJet,
  faBoxes,
  faCity,
  faHandPaper,
  fafabric,
  faFootballBall,
  faPaintBrush,
  faIndustry,
} from "@fortawesome/free-solid-svg-icons";

// Map of icon strings to actual FontAwesome icons
const iconMap = {
  "fa-solid fa-circle": faCircle,
  "fa-solid fa-newspaper": faNewspaper,
  "fa-solid fa-robot": faRobot,
  "fa-solid fa-gamepad": faGamepad,
  "fa-solid fa-film": faFilm,
  "fa-solid fa-vr-cardboard": faVrCardboard,
  "fa-solid fa-coins": faCoins,
  "fa-solid fa-glasses": faGlasses,
  "fa-solid fa-print": faPrint,
  "fa-solid fa-piggy-bank": faPiggyBank,
  "fa-solid fa-watch": faWatch,
  "fa-solid fa-bullhorn": faBullhorn,
  "fa-solid fa-shopping-cart": faShoppingCart,
  "fa-solid fa-brain": faBrain,
  "fa-solid fa-database": faDatabase,
  "fa-solid fa-code": faCode,
  "fa-solid fa-cloud": faCloud,
  "fa-solid fa-atom": faAtom,
  "fa-solid fa-lock": faLock,
  "fa-solid fa-wifi": faWifi,
  "fa-solid fa-network-wired": faNetworkWired,
  "fa-solid fa-tshirt": faTshirt,
  "fa-solid fa-utensils": faUtensils,
  "fa-solid fa-bolt": faBolt,
  "fa-solid fa-desktop": faDesktop,
  "fa-solid fa-car": faCar,
  "fa-solid fa-rocket": faRocket,
  "fa-solid fa-battery-half": faBatteryHalf,
  "fa-solid fa-flask": faFlask,
  "fa-solid fa-square-root-alt": faSquareRootAlt,
  "fa-solid fa-dna": faDna,
  "fa-solid fa-map-marked-alt": faMapMarkedAlt,
  "fa-solid fa-cogs": faCogs,
  "fa-solid fa-industry": faIndustry,

  "fa-solid fa-hammer": faHammer,
  "fa-solid fa-heartbeat": faHeartbeat,
  "fa-solid fa-seedling": faSeedling,
  "fa-solid fa-leaf": faLeaf,
  "fa-solid fa-anchor": faAnchor,
  "fa-solid fa-fighter-jet": faFighterJet,
  "fa-solid fa-boxes": faBoxes,
  "fa-solid fa-city": faCity,
  "fa-solid fa-hand-paper": faHandPaper,
  "fa-solid fa-fabric": fafabric,
  "fa-solid fa-football-ball": faFootballBall,
  "fa-solid fa-paint-brush": faPaintBrush,
};

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
        className={`${styles.sidebarButton} ${router.pathname === "/popular" ? styles.active : ""}`}
        onClick={() => router.push("/popular")}
      >
        
        <FontAwesomeIcon icon={faStarRegular} className={styles.icon} size="lg" />
        Popular
        <span className={styles.chevron2}>⌄</span>
      </button>

      <button
        className={`${styles.sidebarButton} ${router.pathname === "/hooliconnews" ? styles.active : ""}`}
        onClick={() => router.push("/hooliconnews")}
      >
        
        <FontAwesomeIcon icon={faStarRegular} className={styles.icon} size="lg" />
        Hoolicon Business
        <span className={styles.chevron2}>⌄</span>
      </button>



      <button
        className={`${styles.sidebarButton} ${router.pathname === "/hooliconnews" ? styles.active : ""}`}
        onClick={() => router.push("/hooliconnews")}
      >
        
        <FontAwesomeIcon icon={faStarRegular} className={styles.icon} size="lg" />
        Hoolicon Tech
        <span className={styles.chevron2}>⌄</span>
      </button>

      <button
        className={`${styles.sidebarButton} ${router.pathname === "/explore" ? styles.active : ""}`}
        onClick={() => router.push("/explore")}
      >
        <FontAwesomeIcon icon={faCompassRegular} className={styles.icon} size="lg" />
        Explore
        <span className={styles.chevron2}>⌄</span>
      </button>
      <div className={styles.separator}></div>
      <div className={styles.sectionTitle}>Categories</div>
      {displayedCategories.map((item) => (
        <div key={item._id} className={styles.categoryWrapper}>
          <button
            className={styles.categoryButton}
            onClick={() => router.push(`/blog?cat=${item.slug}`)}>

            <span  >
              <FontAwesomeIcon className={styles.icon} size="lg" icon={iconMap[item.icon]} />
            </span>
            <span className={styles.icon2} >
            
            {item.title} </span>
            <span className={styles.chevron2} >⌄</span>
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

      <div className={styles.sectionTitle}>Resources</div>
      <button
        className={`${styles.sidebarButton} ${router.pathname === "/about" ? styles.active : ""}`}
        onClick={() => router.push("/about")}
      >
        <InfoOutlined className={styles.icon} size="lg" />
        About Us
      </button>

      <button
        className={`${styles.sidebarButton} ${router.pathname === "/careers" ? styles.active : ""}`}
        onClick={() => router.push("/careers")}
      >
        <WorkOffOutlined className={styles.icon} size="lg" />
        Careers
      </button>

      <button
        className={`${styles.sidebarButton} ${router.pathname === "/privacy" ? styles.active : ""}`}
        onClick={() => router.push("/privacy")}
      >
        <ShieldOutlined className={styles.icon} size="lg" />
        Privacy Policy
      </button>
      <button
        className={`${styles.sidebarButton} ${router.pathname === "/agreement" ? styles.active : ""}`}
        onClick={() => router.push("/agreement")}
      >
        <GavelOutlined className={styles.icon} size="lg" />
        User Agreement
      </button>
      

    </div>
  );
};

export default SidebarCategoryList;
