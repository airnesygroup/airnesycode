'use client';

import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import styles from './PostOptions.module.css';

const PostOptions = ({ post, onDelete }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);  // Added loading state
  const [errorMessage, setErrorMessage] = useState(null);  // State to hold error message

  const handleDelete = async () => {
    setIsDeleting(true);  // Start loading
    setErrorMessage(null);  // Reset any previous error message
    try {
      const response = await fetch(`/api/posts/${post.id}`, {
        method: 'DELETE',
      });

      // Log full response for debugging purposes
      console.log("Delete response:", response);

      if (response.ok) {
        onDelete(post.id);  // Notify parent to remove the post from the UI
      } else {
        // Parse the error message from the response
        const errorData = await response.json();
        setErrorMessage(errorData.message || "An unknown error occurred.");
      }
    } catch (error) {
      console.error("Error during post deletion:", error);
      setErrorMessage("An unexpected error occurred while deleting the post.");
    }
    setIsDeleting(false);  // Stop loading
  };

  const handleShare = () => {
    alert(`Share this post: ${window.location.origin}/posts/${post.slug}`);
  };

  return (
    <div className={styles.container}>
      <button
        onClick={() => setShowOptions(!showOptions)}
        className={styles.optionsButton}
        aria-label="Toggle post options"
      >
        ...
      </button>

      {showOptions && (
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
      )}

      {errorMessage && (
        <div className={styles.errorMessage}>
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
};

export default PostOptions;
