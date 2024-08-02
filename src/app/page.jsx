"use client";

import { useEffect, useState } from "react";
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
import PopUp from "@/components/PopUp/PopUp";

export default function Home({ searchParams }) {
  console.log("Home component rendered");

  const page = parseInt(searchParams?.page) || 1;

  // State to control the visibility of the pop-up
  const [showPopUp, setShowPopUp] = useState(true);

  // Function to close the pop-up
  const closePopUp = () => {
    console.log("Closing pop-up");
    setShowPopUp(false);
  };

  return (
    <div className={styles.container}>
      {showPopUp && <PopUp closePopUp={closePopUp} />} {/* Render the pop-up conditionally */}
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
    </div>
  );
}