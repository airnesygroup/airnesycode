// src/components/menuLists/MenuListsServer.jsx
"use client"; // Use this if this file is being used in the client-side context

import React, { useState, useEffect } from "react";
import MenuPosts from "../menuPosts/MenuPosts";
import styles from "./menulists.module.css";

const MenuListsServer = ({ page, cat }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `/api/post2?page=${page}&cat=${cat || ""}`
        );
        if (!res.ok) throw new Error("Failed to fetch data");
        
        const data = await res.json();
        setPosts(data.posts);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [page, cat]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.container}>
      <div className={styles.posts}>
        {posts.map((item) => (
          <MenuPosts item={item} withImage={true} key={item._id} />
        ))}
      </div>
    </div>
  );
};


export default MenuListsServer;
