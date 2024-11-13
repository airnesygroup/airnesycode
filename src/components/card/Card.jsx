"use client"; // Add this at the top

import Image from "next/image";
import styles from "./card.module.css";
import { formatDistanceToNow } from 'date-fns';
import { useRouter } from 'next/navigation'; // Use next/navigation for Client Component

const Card = ({ key, item }) => {
  const router = useRouter();

  const deletePost = async (postId) => {
    console.log('Post ID:', postId);  // Debugging: check if the postId is correct
  
    if (!postId) {
      console.error('No post ID provided');
      return;
    }
  
    try {
      const res = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
      });
  
      if (!res.ok) {
        throw new Error('Failed to delete post');
      }
      console.log('Post deleted successfully');
      // Optionally, redirect or update state after successful delete
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const truncatedDesc = item?.desc.substring(0, 500);
  const truncatedDesc2 = item?.desc.substring(0, 140);

  const showMore = item?.desc.length > 300;

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

            {/* Span for delete action */}
            <span className={styles.span} onClick={() => deletePost(item._id)}>
              Delete
            </span>
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
    </>
  );
};

export default Card;
