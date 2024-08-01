import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./menuPosts2.module.css";

// Mapping of slugs to CSS class names
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

const MenuPosts2 = ({ item, withImage }) => {
  // Look up the CSS class name based on item.category
  const className = slugToClassMap[item.category];

  // Ensure className is defined; otherwise, no class is applied
  return (
    <div className={styles.items}>
      <Link href={`/posts/${item.slug}`} className={styles.item} key={item.slug}>
    
        <div className={styles.textContainer}>
          <h3 className={styles.postTitle}>{item.title.substring(0, 60)}</h3>
          <div className={styles.detail}>
            {className && <span className={styles[className]}>{item.category}</span>}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MenuPosts2;
