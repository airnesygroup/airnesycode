'use client';
import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import styles from './PostOptions.module.css';

const PostOptions = ({ post, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false); // Added loading state

  const handleDelete = async () => {
    setIsDeleting(true);  // Start loading
    const response = await fetch(`/api/posts/${post.id}`, {
      method: 'DELETE',
    });

    const result = await response.json();  // Get the detailed response from the server

    if (response.ok) {
      onDelete(post.id);  // Close the options after deleting
    } else {
      // Display error details in an alert
      alert(`Error: ${result.message}\nDetails: ${result.error || "Unknown error"}`);
    }
    setIsDeleting(false);  // Stop loading
  };

  const handleShare = () => {
    alert(`Share this post: ${window.location.origin}/posts/${post.slug}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.options}>
        <div onClick={handleShare} className={styles.option}>
          <FontAwesomeIcon icon={faShareAlt} />
          <span>Share</span>
        </div>
        <div
          onClick={handleDelete}
          className={styles.option}
          disabled={isDeleting}
        >
          <FontAwesomeIcon icon={faTrash} />
          <span>{isDeleting ? 'Deleting...' : 'Delete'}</span>
        </div>
      </div>
    </div>
  );
};

export default PostOptions;
8