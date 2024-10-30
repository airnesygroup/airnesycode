import React from "react";
import styles from "./menulists.module.css";
import MenuPosts from "../menuPosts/MenuPosts";

const getData = async (page, cat) => {

  
  const res = await fetch(
    `https://www.airnesy.com/api/postsviews?page=${page}&cat=${cat || ""}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const Menulists = async ({ page, cat }) => {
  const { posts, count } = await getData(page, cat);

  const POST_PER_PAGE = 4;

  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;

  return (
    <div className={styles.container}>
      <div className={styles.posts}>
        {posts?.map((item) => (
          <MenuPosts item={item} withImage={true} key={item._id} />
        ))}
      </div>
    </div>
  );
};

export default Menulists;
