"use client"; // Add this line

import Image from "next/image";
import styles from "./card.module.css";
import Link from "next/link";
import { formatDistanceToNow } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useState, useRef, useEffect } from "react";

// The rest of your component code remains the same
const Card = ({ key, item }) => {
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);

  const truncatedDesc = item?.desc.substring(0, 500);
  const truncatedDesc2 = item?.desc.substring(0, 140);
  const showMore = item?.desc.length > 300;

  const togglePopup = () => setShowPopup((prev) => !prev);

  const copyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/posts/${item.slug}`);
    setShowPopup(false);
    alert("Link copied to clipboard!");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

            <span className={styles.span} onClick={(e) => {e.preventDefault(); togglePopup()}}>..</span>

            {showPopup && (
              <div ref={popupRef} className={styles.popup}>
                <button onClick={copyLink}>Share Link</button>
                <button onClick={() => alert("Report submitted!")}>Report</button>
              </div>
            )}
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
      </div>
      <div className={styles.horizontalLine}></div>
    </Link>
  );
};

export default Card;
