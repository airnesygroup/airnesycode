// components/MenuLists.jsx
import React, { useEffect, useState } from "react";
import MenuPosts from "../menuPosts/MenuPosts";
import styles from "./menulists.module.css";

const MenuListsServer = ({ page, cat }) => {
  const [posts, setPosts] = useState([]);
  const [count, setCount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://www.airnesy.com/api/post2?page=${page}&cat=${cat || ""}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        setPosts(data.posts);
        setCount(data.count);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, [page, cat]);

  const POST_PER_PAGE = 4;
  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;

  if (error) return <div>Error: {error}</div>;
  if (!posts.length) return <div>Loading...</div>;

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
