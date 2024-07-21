// Import necessary hooks and components from React and Next.js
import React from "react";
import MenuPosts from "../menuPosts/MenuPosts";
import styles from "./menulists.module.css";

// Define a server component to fetch data and pass it to the client component
const MenuListsServer = async ({ page, cat }) => {
  const res = await fetch(
    `https://www.airnesy.com/api/post2?page=${page}&cat=${cat || ""}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const { posts, count } = await res.json();
  const POST_PER_PAGE = 4;
  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;

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
