import React from "react";
import styles from "./menulists2.module.css";
import MenuPosts2 from "../Menuposts2/menuposts2";

const getData = async (page, cat) => {
  const res = await fetch(
    `https://www.airnesy.com/api/post2?page=${page}&cat=${cat || ""}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const Menulists2 = async ({ page, cat }) => {
  const { posts, count } = await getData(page, cat);

  const POST_PER_PAGE = 4;

  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;

  return (
    <div className={styles.container}>
      <div className={styles.posts}>
        {posts?.map((item) => (
          <MenuPosts2 item={item} withImage={true} key={item._id} />
        ))}
      </div>
    </div>
  );
};

export default Menulists2;
