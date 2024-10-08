import React from "react";
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
    throw new Error("Failed");
  }

  return res.json();
};

const CardList = async ({ page, cat }) => {
  const { posts, count } = await getData(page, cat);


  return (
    <div className={styles.container}>

      <div className={styles.posts}>
        {posts?.map((item) => (
          <Card item={item} key={item._id} />
        ))}
      </div>
    </div>
  );
};

export default CardList;
