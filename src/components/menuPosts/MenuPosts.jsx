import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./menuPosts.module.css";

// Define a mapping of categories to CSS classes
const categoryToClassMap = {
  "general": "general",
  "news-politics": "news-and-politics",
  "business": "business",
  "technology": "technology",
  "science": "science",
  "q-a": "q-and-a",
  "health-fitness": "health-and-fitness",
  "sports": "sports",
  "gaming": "gaming",
  "funny": "funny",
  "music-entertainment": "music-and-entertainment",
  "movies-tv": "movies-and-tv",
  "anime": "anime",
  "pop-culture": "pop-and-culture",
  "fashion-beauty": "fashion-and-beauty",
  "lifestyle": "lifestyle",
  "food-drinks": "food-and-drinks",
  "arts-crafts": "arts-and-crafts",
  "hobbies-collectibles": "hobbies-and-collectibles",
  "places-travel": "places-and-travel",
  "home-garden": "home-and-garden",
  "education-career": "education-and-career",
  "humanities-law": "humanities-and-law",
  "books": "books",
  "nature-outdoors": "nature-and-outdoors",
  "environment-climate": "environment-and-climate",
  "vehicles-machinery": "vehicles-and-machinery"
};
const MenuPosts = ({ item, withImage }) => {
  // Check if the item or required fields are missing
  if (!item || !item.slug || !item.title) {
    return null; // Return null to avoid rendering if item is invalid
  }

  // Proceed with rendering if item exists and has required fields
  const categoryClass = categoryToClassMap[item.catSlug] || '';

  return (
    <div className={styles.items}>
      <Link href={`/posts/${item.slug}`} className={styles.item} key={item.slug}>
        <div className={styles.topRow}>
          {withImage && (
            <div className={styles.imageContainer}>
              {item.user?.image ? (
                <Image
                  src={item.user.image}
                  alt={item.title}
                  fill
                  className={styles.image}
                />
              ) : (
                <Image
                  src="/profile.png"
                  alt={item.title}
                  fill
                  className={styles.image}
                />
              )}
            </div>
          )}
             <div className={styles.userInfo}>
                    <p className={styles.username}>{item.user?.name}</p>
                    <span className={styles.category}>{item.catSlug}</span>

                  </div>
       
             </div>
          
      
      </Link>
    </div>
  );
};


export default MenuPosts;
