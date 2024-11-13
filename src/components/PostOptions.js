
import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import styles from './PostOptions.module.css';

const PostOptions = ({ post, onDelete }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");  // State for storing response message

  const handleDelete = async () => {
    setIsDeleting(true);  // Start loading
    setResponseMessage(""); // Reset the response message before making the request

    const response = await fetch(`/api/posts/${post.id}`, {
      method: 'DELETE',
    });

    const data = await response.json();  // Get JSON response

    if (response.ok) {
      setResponseMessage(data.message);  // Set success message
      onDelete(post.id);  // Call the onDelete prop to remove the post from the UI
    } else {
      setResponseMessage(data.message);  // Set error message
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

      {responseMessage && (
        <div className={styles.responseMessage}>
          {responseMessage}
        </div>
      )}
    </div>
  );
};

export default PostOptions;
