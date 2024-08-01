import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./menuPosts.module.css";

const slugToClassMap = {
  "general": "general",
  "news&politics": "news-and-politics",
  "business&finance": "business-and-finance",
  "technology": "technology",
  "science": "science",
  "q&a": "q-and-a",
  "health&fitness": "health-and-fitness",
  "sports": "sports",
  "gaming": "gaming",
  "funny": "funny",
  "music&entertainment": "music-and-entertainment",
  "movies&tv": "movies-and-tv",
  "anime": "anime",
  "pop&culture": "pop-and-culture",
  "fashion&beauty": "fashion-and-beauty",
  "lifestyle": "lifestyle",
  "food&drinks": "food-and-drinks",
  "arts&crafts": "arts-and-crafts",
  "hobbies&collectibles": "hobbies-and-collectibles",
  "places&travel": "places-and-travel",
  "home&garden": "home-and-garden",
  "education&career": "education-and-career",
  "humanities&law": "humanities-and-law",
  "books": "books",
  "nature&outdoors": "nature-and-outdoors",
  "environment&climate": "environment-and-climate",
  "vehicles&machinery": "vehicles-and-machinery"
};

const MenuPosts = ({ item, withImage }) => {
  // Get the CSS class name from the slug
  const categoryClass = slugToClassMap[item.catSlug];

  return (
    <div className={styles.items}>
      <Link href={`/posts/${item.slug}`} className={styles.item} key={item.slug}>
     
 
        {withImage && (
          <div className={styles.imageContainer}>
            <Image src="/profile.png" alt={item.title} fill className={styles.image} />
          </div>
        )}
        
         {categoryClass && (
            <span className={`${styles.category} ${styles[categoryClass]}`}>
              {item.catSlug}
            </span>
          )}

        <div className={styles.textContainer}>
          <h3 className={styles.postTitle}>{item.title.substring(0, 60)}</h3>
          <div className={styles.detail}>
            <span className={styles[className]}>{item.category}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MenuPosts;
