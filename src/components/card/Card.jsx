
'use client';

import React, { useState } from "react";
import Image from "next/image";
import styles from "./card.module.css";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons"; // Import the verified icon

const Card = ({ key, item }) => {
  const [showPopup, setShowPopup] = useState(false);  // Popup visibility state
  const [isDeleting, setIsDeleting] = useState(false); // To track if a delete request is in progress
  const [errorMessage, setErrorMessage] = useState(""); // To store the error message

  const truncatedDesc = item?.desc.substring(0, 500);
  const truncatedDesc2 = item?.desc.substring(0, 140);

  const showMore = item?.desc.length > 300;

  // Handle delete post
  const handleDelete = async () => {
    setIsDeleting(true);
    setErrorMessage(""); // Clear previous errors before new request

    try {
      const response = await fetch(`/api/posts/${item._id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        // Handle and show the exact error message from the backend
        setErrorMessage(result.message || "Failed to delete post");
      } else {
        alert("Post deleted successfully!");
        // Refresh or update your UI to remove the deleted post (this may depend on your structure)
        // You could trigger a page refresh or update the state in the parent component to remove the post
      }
    } catch (error) {
      console.error("Delete failed:", error);
      setErrorMessage("An unexpected error occurred while deleting the post");
    } finally {
      setIsDeleting(false);
      setShowPopup(false); // Close the popup after action
    }
  };

  return (
    <>
      <div className={styles.container} key={key}>
        {/* Profile Section */}
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
        {/* Post Information Section */}
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
                    alt="Verified"
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
            {/* The "..." span for showing the delete popup */}
            <span
              className={styles.span}
              onClick={() => setShowPopup(true)} // Trigger popup
            >
              ...
            </span>
          </div>

          <h1 className={styles.title}>{item.title.substring(0, 150)}</h1>

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

        {/* Delete Popup */}
        {showPopup && (
          <div className={styles.deletePopup}>
            <div className={styles.popupContent}>
              <h2>Are you sure you want to delete this post?</h2>
              <button
                className={styles.deleteButton}
                onClick={handleDelete}
                disabled={isDeleting} // Disable the button while deleting
              >
                {isDeleting ? "Deleting..." : "Delete Post"}
              </button>
              <button
                className={styles.cancelButton}
                onClick={() => setShowPopup(false)} // Close the popup
              >
                Cancel
              </button>
              {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Card;
