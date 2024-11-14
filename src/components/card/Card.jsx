"use client";

import Image from "next/image";
import styles from "./card.module.css";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react"; // Import useSession to get the current user
import axios from "axios"; // To make the API request to delete the post

const Card = ({ key, item }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [showEmails, setShowEmails] = useState(false); // To control displaying emails
  const [isDeleted, setIsDeleted] = useState(false); // To control if the post is deleted
  const popupRef = useRef(null);
  
  // Get the current user's session (email) using NextAuth
  const { data: session } = useSession();
  
  const truncatedDesc = item?.desc.substring(0, 500);
  const truncatedDesc2 = item?.desc.substring(0, 140);
  const showMore = item?.desc.length > 300;

  const togglePopup = () => setShowPopup((prev) => !prev);

  const copyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/posts/${item.slug}`);
    setShowPopup(false);
    alert("Link copied to clipboard!");
  };

  const closePopup = () => setShowPopup(false);

  const handleCheckEmails = () => {
    // Toggle the display of emails
    setShowEmails((prev) => !prev);
  };
  const handleDeletePost = async () => {
    try {
      // Ensure you are passing the correct URL with query parameters
      const response = await axios.delete(`/api/posts/delete?postId=${item.id}`);
  
      if (response.status === 200) {
        setIsDeleted(true); // Set the deleted state to true
        alert("Post deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete the post.");
    }
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

  if (isDeleted) return null; // Don't render the post if it has been deleted

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

            <div style={{ position: "relative" }}>
              <span className={styles.span} onClick={(e) => { e.preventDefault(); togglePopup(); }}>...</span>
              {showPopup && (
                <div ref={popupRef} className={styles.popup}>
                  <button onClick={copyLink}>Copy Link</button>
                  <div className={styles.horizontalLine2}></div>

                  <button onClick={closePopup} href={`/posts/${item.slug}`} passHref>
                    Go to Post
                  </button>    

                  <div className={styles.horizontalLine2}></div>

                  <button onClick={() => alert("Report submitted!")}>Report</button>    
                  <div className={styles.horizontalLine2}></div>

                  <button onClick={() => alert("Post saved")}>Save</button>
                  <div className={styles.horizontalLine2}></div>

                  {/* Show the Delete button only if emails match */}
                  {session?.user?.email === item.user?.email && (
                    <button onClick={handleDeletePost} className={styles.deleteButton}>
                      Delete Post
                    </button>
                  )}

                  <div className={styles.horizontalLine2}></div>

                  <button onClick={closePopup}>Cancel</button>
                </div>
              )}
            </div>
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
          
          {/* Check Emails Button */}
          <button onClick={handleCheckEmails} className={styles.checkEmailsButton}>
            Check Emails
          </button>
          
          {/* Display emails if showEmails is true */}
          {showEmails && (
            <div className={styles.emailsDisplay}>
              <p><strong>Current User Email:</strong> {session?.user?.email}</p>
              <p><strong>Post Creator's Email:</strong> {item.user?.email}</p>
            </div>
          )}

        </div>
      </div>
      <div className={styles.horizontalLine}></div>
    </>
  );
};

export default Card;
