
"use client"; // This ensures this component is client-side

import React, { useState } from "react";
import { useRouter } from "next/router";
import { getAuthSession } from "@/utils/auth"; // Assumes you have an authentication helper
import styles from "./postOptions.module.css";

const PostOptions = ({ postId, userEmail }) => {
  const [showOptions, setShowOptions] = useState(false);
  const router = useRouter();

  // Fetch the current user's session to check if they own the post
  const session = await getAuthSession();
  const isOwner = session && session.user.email === userEmail;

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleShare = () => {
    // Logic to handle sharing (e.g., copy link to clipboard)
    const postUrl = `${window.location.origin}/posts/${postId}`;
    navigator.clipboard.writeText(postUrl).then(() => {
      alert("Post URL copied to clipboard!");
    });
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this post?")) {
      try {
        const response = await fetch(`/api/posts/${postId}`, {
          method: "DELETE",
        });
        if (response.ok) {
          alert("Post deleted successfully!");
          router.reload();
        } else {
          alert("Failed to delete the post!");
        }
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <span className={styles.menuIcon} onClick={toggleOptions}>...</span>
      {showOptions && (
        <div className={styles.optionsPopup}>
          <button onClick={handleShare}>Share</button>
          {isOwner && <button onClick={handleDelete}>Delete</button>}
        </div>
      )}
    </div>
  );
};

export default PostOptions;
