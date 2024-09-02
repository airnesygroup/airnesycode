import Image from "next/image";
import styles from "./card.module.css";
import Link from "next/link";

const Card = ({ key, item }) => {
  return (
    <div className={styles.container} key={key}>
      <div className={styles.header}>
      <div className={styles.userProfile}>
            <Image src={item.user?.image} alt={item.user?.name} className={styles.profileImage} width={25} height={25} />
            <div className={styles.userInfo}>
              <p className={styles.username}>{item.user?.name}</p>
              <p className={styles.userRole}>{item.user?.role}</p>
              
            </div>
            <span className={styles.date}>{item.createdAt.substring(0, 10)}</span>

          </div>
        <span className={styles.category}>{item.catSlug}</span>
      </div>
      <Link href={`/posts/${item.slug}`}>
        <h1 className={styles.title}>{item.title.substring(0, 60)}</h1>
      </Link>
      <div className={styles.desc} dangerouslySetInnerHTML={{ __html: item?.desc.substring(0, 160) }} />
      <Link href={`/posts/${item.slug}`} className={styles.link}>
        Read Mor
      </Link>
      {item.img && (
        <div className={styles.imageContainer}>
          <Image src={item.img} alt="" fill className={styles.image} />
        </div>
      )}
    </div>
  );
};

export default Card;

