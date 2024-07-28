import Image from "next/image";
import styles from "./card.module.css";
import Link from "next/link";

const Card = ({ key, item }) => {
  const truncatedDesc = item?.desc.substring(0, 300);
  const showMore = item?.desc.length > 300;

  return (
    <Link href={`/posts/${item.slug}`} passHref>
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
                <div className={styles.userProfile}>
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
            </div>
            <span className={styles.category}>{item.catSlug}</span>
          </div>
          <h1 className={styles.title}>{item.title.substring(0, 150)}</h1>
          <div className={styles.descContainer}>
            <div
              className={styles.desc}
              dangerouslySetInnerHTML={{ __html: truncatedDesc }}
            />
            {showMore && (
              <span className={styles.link}>Show More</span>
            )}
          </div>
          {item.img && (
            <div className={styles.imageContainer}>
              <Image src={item.img} alt="" fill className={styles.image} />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default Card;
