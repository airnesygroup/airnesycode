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
    localStorage.setItem('popupShown', 'true'); // Mark popup as shown
  };

  useEffect(() => {
    // Check local storage to determine if popup should be shown
    const popupShown = localStorage.getItem('popupShown');
    if (!popupShown) {
      setIsPopupVisible(true); // Show popup if it hasn't been shown before
    }
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
