// src/app/page.jsx
"use client";  // Add this line at the top

import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./homepage.module.css";
import Featured from "@/components/featured/Featured";
import CategoryList from "@/components/categoryList/CategoryList";
import CardList from "@/components/cardList/CardList";
import Menu from "@/components/Menu/Menu";
import SidebarCategoryList from "@/components/SidebarcategoryList/SidebarCategoryList";
import CarouselList from "@/components/carouselList/CarouselList";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import Popup from "@/components/popup";
import ErrorBoundary from "@/components/ErrorBoundary"; // Import ErrorBoundary

export default function Home({ searchParams }) {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const page = parseInt(searchParams.page) || 1;

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  useEffect(() => {
    // Check if the popup has already been shown in this session
    if (!sessionStorage.getItem("popupShown")) {
      setIsPopupVisible(true);
      sessionStorage.setItem("popupShown", "true");
    }

    // This effect runs when the component mounts
    console.log("Component mounted");
  }, []);

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.menu}>
        <SidebarCategoryList />
      </div>
      <div className={styles.mainContent}>
        <CategoryList />
        <CarouselList page={page} />
        <div className={styles.content1}>
          <CardList page={page} />
          <Menu />
        </div>
        <Footer />
      </div>
      <ErrorBoundary>
        {isPopupVisible && <Popup onClose={handleClosePopup} />}
      </ErrorBoundary>
    </div>
  );
}
