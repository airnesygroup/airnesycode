import Image from "next/image";
import styles from "./card.module.css";
import Link from "next/link";

const Card = ({ key, item }) => {
  return (
    <div className={styles.container} key={key}>
      <div className={styles.profileContainer}>
        <Image
          src={item.user?.image}
          alt={item.user?.name}
          className={styles.profileImage}
          width={25}
          height={25}
        />
        <div className={styles.verticalLine}></div>
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.header}>
          <div className={styles.userProfile}>
            <div className={styles.userInfo}>
              <Image
                src={item.user?.image}
                alt={item.user?.name}
                className={styles.profileImage2}
                width={25}
                height={25}
              />
              <div className={styles.userInfo}>
                <p className={styles.username}>{item.user?.name}</p>
                <p className={styles.userRole}>{item.user?.role}</p>
              </div>
              <span className={styles.date}>
                {item.createdAt.substring(0, 10)}
              </span>
            </div>
          </div>
          <span className={styles.category}>{item.catSlug}</span>
        </div>
        <Link href={`/posts/${item.id}`}>
          <h1 className={styles.title}>{item.title.substring(0, 140)}</h1>
        </Link>
        <div
          className={styles.desc}
          dangerouslySetInnerHTML={{
            __html: item?.desc.substring(0, 240),
          }}
        />
        <Link href={`/posts/${item.id}`} className={styles.link}>
          Read More
        </Link>
        {item.img && (
          <div className={styles.imageContainer}>
            <Image src={item.img} alt="" fill className={styles.image} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
