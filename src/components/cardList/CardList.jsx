
"use client";  // This marks the component as a client component

import React, { useState } from "react";
import styles from "./cardList.module.css";
import Pagination from "../pagination/Pagination";
import Card from "../card/Card";
import { useRouter } from "next/router";

const getData = async (page, cat) => {
  const res = await fetch(
    `https://www.airnesy.com/api/postsimg?page=${page}&cat=${cat || ""}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
};

const CardList = async ({ page, cat }) => {
  const { posts, count } = await getData(page, cat);
  const router = useRouter();
  const POST_PER_PAGE = 10;
  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;

  const handleDelete = async (postId) => {
    const res = await fetch(`/api/posts/${postId}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      // Refresh or remove post from the list
      alert("Post deleted successfully!");
      router.reload();
    } else {
      alert("Failed to delete the post.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.posts}>
        {posts?.map((item) => (
          <Card item={item} key={item._id} onDelete={handleDelete} />
        ))}
      </div>

      <Pagination hasPrev={hasPrev} hasNext={hasNext} page={page} />
    </div>
  );
};

export default CardList;
