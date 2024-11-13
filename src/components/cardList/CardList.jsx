'use client';


import React, { useState } from "react";
import styles from "./cardList.module.css";
import Card from "../card/Card";
import Pagination from "../pagination/Pagination";

const CardList = ({ page, cat }) => {
  const [posts, setPosts] = useState([]);
  
  const getData = async (page, cat) => {
    const res = await fetch(
      `https://www.airnesy.com/api/postsimg?page=${page}&cat=${cat || ""}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed");
    }

    const data = await res.json();
    setPosts(data.posts);
  };

  const handlePostDeleted = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  React.useEffect(() => {
    getData(page, cat);
  }, [page, cat]);

  return (
    <div className={styles.container}>
      <div className={styles.posts}>
        {posts?.map((item) => (
          <Card
            key={item.id}
            item={item}
            onPostDeleted={handlePostDeleted} // Pass delete handler
          />
        ))}
      </div>
      <Pagination page={page} />
    </div>
  );
};

export default CardList;
