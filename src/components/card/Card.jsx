'use client';


import { useState } from 'react';
import Image from "next/image";
import styles from "./card.module.css";
import Link from "next/link";
import { formatDistanceToNow } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'; // Import the verified icon
import PostOptions from '../PostOptions';  // Import the PostOptions component

const Card = ({ key, item }) => {
  const [showOptions, setShowOptions] = useState(false);
  const truncatedDesc = item?.desc.substring(0, 500);
  const truncatedDesc2 = item?.desc.substring(0, 140);

  const showMore = item?.desc.length > 300;

  const handleDelete = async (postId) => {
    // Function to handle delete action in Card component if needed
    console.log(`Post ${postId} deleted`);
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
                    <p className={styles.username}>{item.user?.name.substring(0, 10)}</p>
                    <p className={styles.userRole}>{item.user?.role}</p>
                  </div>
                  <img 
                    src="/verified.png"     
                    alt="Verified" 
                    className={styles.verifiedIcon} 
                  />
                  <span className={styles.date}>
                    {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true }).substring(0, 13)}
                  </span>
                </div>
              </div>
            </div>
            <span className={styles.category}>{item.catSlug}</span>
            <span className={styles.span}>..</span>
          </div>
          <h1 className={styles.title}>{item.title.substring(0, 150)}</h1>
          <h1 className={styles.title2}>{item.title.substring(0,150)}</h1>

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

        {/* Show the PostOptions component when "..." is clicked */}
        <div onClick={() => setShowOptions(!showOptions)}>
          {showOptions && (
            <PostOptions post={item} onDelete={handleDelete} />
          )}
        </div>
      </div>
      <div className={styles.horizontalLine}></div>
    </Link>
  );
};

export default Card;
