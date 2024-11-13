// PostOptions.js

import { useState } from "react";
import { useRouter } from "next/router";
import { getAuthSession } from "@/utils/auth";

export default function PostOptions({ postId, userEmail }) {
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState(null);
  const router = useRouter();

  // Get the current session (user)
  useEffect(() => {
    async function fetchSession() {
      const sessionData = await getAuthSession();
      setSession(sessionData);
    }
    fetchSession();
  }, []);

  // Toggle pop-up visibility
  const togglePopup = () => setIsOpen(!isOpen);

  // Share functionality
  const handleShare = () => {
    const shareUrl = `${window.location.origin}/posts/${postId}`;
    if (navigator.share) {
      navigator.share({
        title: "Check out this post!",
        url: shareUrl,
      }).catch(console.error);
    } else {
      alert(`Copy this link to share: ${shareUrl}`);
    }
  };

  // Delete functionality
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Post deleted successfully!");
        router.push("/"); // Redirect to homepage or another page
      } else {
        alert("Failed to delete post.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred.");
    }
  };

  // Check if the current user owns the post
  const isOwner = session?.user.email === userEmail;

  return (
    <div>
      <button onClick={togglePopup}>•••</button>
      
      {isOpen && (
        <div className="popup">
          <button onClick={handleShare}>Share</button>
          {isOwner && <button onClick={handleDelete}>Delete</button>}
        </div>
      )}

      <style jsx>{`
        .popup {
          position: absolute;
          background: white;
          border: 1px solid #ccc;
          border-radius: 4px;
          padding: 8px;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
        }
        button {
          background: none;
          border: none;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
