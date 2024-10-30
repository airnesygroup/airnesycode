// CarouselList.js

import React from "react";
import styles from "./carouselList.module.css";
import CarouselListClient from "./CarouselListClient";

const getData = async (page, cat) => {
  const res = await fetch(
    `https://www.airnesy.com/api/carouselimg?page=${page}&cat=${cat || ""}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

const CarouselList = async ({ page, cat }) => {
  const { posts, count } = await getData(page, cat);

  return (
    <div className={styles.container}>
      <CarouselListClient posts={posts} />
    </div>
  );
};

export default CarouselList;
