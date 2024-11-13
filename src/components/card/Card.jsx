'use client'; // Marking this as a client-side component

import { useState } from "react";
import Image from "next/image";
import styles from "./card.module.css";
import Link from "next/link";
import { formatDistanceToNow } from 'date-fns';

const Card = ({ key, item }) => {
  const [message, setMessage] = useState(''); // State to hold the message

  const truncatedDesc = item?.desc.substring(0, 500);
  const truncatedDesc2 = item?.desc.substring(0, 140);

  const handleSpanClick = async () => {
    setMessage(`You are about to delete Post ID: ${item.id}`);
  
    try {
      const response = await fetch(`/api/posts/${item.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const result = await response.json();
  
      if (response.ok) {
        // Successfully deleted the post
        setMessage(`Post ID ${item.id} has been deleted.`);
      } else {
        setMessage(result.message || 'Failed to delete the post.');
      }
    } catch (error) {
      setMessage('Error deleting post.');
      console.error(error);
    }
  };
  

  

  return (
    <>
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
            <span className={styles.span} onClick={handleSpanClick}>..</span> {/* Click handler here */}
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
      </div>
      <div className={styles.horizontalLine}></div>
      
      {/* Display the message with the post ID */}
      {message && <div className={styles.message}>{message}</div>}
    </>
  );
};

export default Card;
