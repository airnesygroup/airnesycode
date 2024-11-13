'use client';


import React, { useState } from "react";
import styles from "./cardList.module.css";
import Pagination from "../pagination/Pagination";
import Card from "../card/Card";

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

  return res.json();
};

const CardList = async ({ page, cat }) => {
  const { posts, count } = await getData(page, cat);

  const POST_PER_PAGE = 10;

  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;

  const handleDelete = (deletedPostId) => {
    // Filter out the deleted post
    setPosts((prevPosts) => prevPosts.filter(post => post.id !== deletedPostId));
  };

  return (
    <div className={styles.container}>
      <div className={styles.posts}>
        {posts?.map((item) => (
          <Card item={item} key={item.id} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default CardList;
