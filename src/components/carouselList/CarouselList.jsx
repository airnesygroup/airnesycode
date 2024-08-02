// components/CarouselList.js
import React, { useEffect, useState } from "react";
import styles from "./carouselList.module.css";
import CarouselListClient from "./CarouselListClient";

const getData = async (page, cat) => {
  const res = await fetch(
    `https://www.airnesy.com/api/postsimg?page=${page}&cat=${cat || ""}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

const CarouselList = ({ page, cat }) => {
  const [data, setData] = useState({ posts: [], count: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData(page, cat);
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, cat]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className={styles.container}>
      <CarouselListClient posts={data.posts} />
    </div>
  );
};

export default CarouselList;
