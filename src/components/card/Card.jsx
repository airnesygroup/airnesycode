
'use client';

import { useState } from "react";
import Image from "next/image";
import styles from "./card.module.css";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import PostOptions from "../PostOptions";


const Card = ({ key, item, userEmail }) => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isPostOwner, setIsPostOwner] = useState(item.userEmail === userEmail);

  const truncatedDesc = item?.desc.substring(0, 500);
  const truncatedDesc2 = item?.desc.substring(0, 140);

  const showMore = item?.desc.length > 300;

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  const handleDelete = async () => {
    const response = await fetch(`/api/posts/${item.id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      alert("Post deleted successfully!");
      // Optionally, trigger a state update to remove the post from the list
    } else {
      alert("Failed to delete post");
    }
  };

  return (
    <Link href={`/posts/${item.slug}`} passHref>
      <div className={styles.container} key={key}>
        <div className={styles.profileContainer}>
          <Image
            src={item.user?.image}
            alt={item.user?.name}
            className={styles.profileImage}
            width={40}
            height={40}
          />
          <div className={styles.verticalLine}></div>
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.header}>
            <div className={styles.userProfile}>
              <div className={styles.userInfo}>
                <div className={styles.userProfile}>
                  <Image
                    src={item.user?.image}
                    alt={item.user?.name}
                    className={styles.profileImage2}
                    width={26}
                    height={26}
                  />
                  <div className={styles.userInfo}>
                    <p className={styles.username}>
                      {item.user?.name.substring(0, 10)}
                    </p>
                    <p className={styles.userRole}>{item.user?.role}</p>
                  </div>
                  <img
                    src="/verified.png"
                    alt="Verifed"
                    className={styles.verifiedIcon}
                  />
                  <span className={styles.date}>
                    {formatDistanceToNow(new Date(item.createdAt), {
                      addSuffix: true,
                    }).substring(0, 13)}
                  </span>
                </div>
              </div>
            </div>

            <span className={styles.category}>{item.catSlug}</span>

            <span className={styles.span}>...</span>
            <button className={styles.ellipsisButton} onClick={togglePopup}>
              &#8230;
            </button>
          </div>
          <h1 className={styles.title}>{item.title.substring(0, 150)}</h1>
          <h1 className={styles.title2}>{item.title.substring(0, 150)}</h1>

          <div className={styles.descContainer}>
            <div
              className={styles.desc}
              dangerouslySetInnerHTML={{ __html: truncatedDesc }}
            />
            <div
              className={styles.desc2}
              dangerouslySetInnerHTML={{ __html: truncatedDesc2 }}
            />
          </div>

          {item.img && (
            <div className={styles.imageContainer}>
              <div
                className={styles.imageBackground}
                style={{
                  backgroundImage: `url(${item.img})`,
                }}
              />
              <Image
                src={item.img}
                alt={item.title}
                layout="intrinsic"
                className={styles.image}
              />
            </div>
          )}
        </div>

        {isPopupVisible && (
          <PostOptions
            isPostOwner={isPostOwner}
            handleDelete={handleDelete}
            togglePopup={togglePopup}
          />
        )}
      </div>
      <div className={styles.horizontalLine}></div>
    </Link>
  );
};

export default Card;
