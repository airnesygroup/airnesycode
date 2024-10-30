import Image from "next/image";
import styles from "./card.module.css";
import Link from "next/link";
import { formatDistanceToNow } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'; // Import the verified icon




const Card = ({ key, item }) => {
  const truncatedDesc = item?.desc.substring(0, 500);
  const truncatedDesc2 = item?.desc.substring(0, 250);

  const showMore = item?.desc.length > 300;

  return (
    <Link href={`/posts/${item.slug}`} passHref>
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
                    width={25}
                    height={25}
                  />
                  <div className={styles.userInfo}>
                    <p className={styles.username}>{item.user?.name}</p>
                    <p className={styles.userRole}>{item.user?.role}</p>
                  </div>
                  <img 
src="/verified.png"     alt="Verified" 
className={styles.verifiedIcon} 
    />
                  <span className={styles.date}>
  {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
</span>

                </div>
              </div>
            </div>
            <span className={styles.span}>...</span>
          </div>
          <h1 className={styles.title}>{item.title.substring(0, 150)}</h1>
          <h1 className={styles.title2}>{item.title.substring(0, 80)}</h1>

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
              {/* Move the horizontal line here */}
            </div>
          )}

        </div>

      </div>
      <div className={styles.horizontalLine}></div>

    </Link>
  );
};

export default Card;
