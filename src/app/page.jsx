
"use client";

import { useState, useEffect } from "react";
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
import Popup from "@/components/PopUp/PopUp";
export default function Home({ searchParams }) {
  const [isPopupVisible, setIsPopupVisible] = useState(true);

  const page = parseInt(searchParams.page) || 1;

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

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

      {isPopupVisible && <Popup onClose={handleClosePopup} />}
    </div>
  );
}

