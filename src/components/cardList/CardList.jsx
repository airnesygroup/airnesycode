
"use client";

import React, { useEffect, useState } from "react";
import styles from "./cardList.module.css";
import Card from "../card/Card";

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

const CardList = ({ page, cat }) => {
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

  const POST_PER_PAGE = 10;
  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < data.count;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className={styles.container}>
      <div className={styles.posts}>
        {data.posts?.map((item) => (
          <Card item={item} key={item._id} />
        ))}
      </div>
    </div>
  );
};

export default CardList;
