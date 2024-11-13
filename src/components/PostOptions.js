
"use client"; // This ensures this component is client-
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { NextResponse } from "next/server";
import { faShareAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./PostOptions.module.css";

const PostOptions = ({ postId, userEmail, slug }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleShare = () => {
    // Handle sharing logic (e.g., open a share modal or redirect to social media)
    alert("Share functionality goes here");
  };

  const handleDelete = async () => {
    if (!session || session.user.email !== userEmail) {
      alert("You can only delete your own posts!");
      return;
    }

    try {
      const res = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Post deleted successfully");
        router.push("/"); // Navigate to home after deletion
      } else {
        alert("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className={styles.optionsWrapper}>
      <button onClick={toggleMenu} className={styles.optionsButton}>
        ...
      </button>
      {isOpen && (
        <div className={styles.menu}>
          <button onClick={handleShare} className={styles.menuItem}>
            <FontAwesomeIcon icon={faShareAlt} /> Share
          </button>
          {session && session.user.email === userEmail && (
            <button onClick={handleDelete} className={styles.menuItem}>
              <FontAwesomeIcon icon={faTrashAlt} /> Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default PostOptions;
