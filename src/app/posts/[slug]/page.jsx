import Menu from "@/components/Menu/Menu";
import styles from "./singlePage.module.css";
import Image from "next/image";
import Comments from "@/components/comments/Comments";
import SidebarCategoryList from "@/components/SidebarcategoryList/SidebarCategoryList";
import Navbar from "@/components/navbar/Navbar";

const getData = async (slug) => {
  const res = await fetch(`https://www.airnesy.com/api/posts/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const SinglePage = async ({ params }) => {
  const { slug } = params;

  const data = await getData(slug);

  return (
      <div className={styles.container}>
     
  
       <Navbar />
  
        <div className={styles.menu}>
          <SidebarCategoryList />
        </div>
        <div className={styles.mainContent}>
  
  
          <div className={styles.content1}>

          <div className={styles.contentia}>

            <div className={styles.postia}>
            
       
            <div className={styles.textContaineria}>
     
             {data?.img && (
              <div className={styles.imageContaineria}>
             <Image src={data.img} alt="" fill className={styles.imageia} />
             </div>
             )}
             </div>
            <h1 className={styles.titleia}>{data?.title}</h1>
            <div className={styles.useria}>
              {data?.user?.image && (
                <div className={styles.userImageContaineria}>
                  <Image src={data.user.image} alt="" fill className={styles.avataria} />
                </div>
              )}
              <div className={styles.userTextContaineria}>
                <span className={styles.usernameia}>{data?.user.name}</span>
                <span className={styles.dateia}>{data?.date || '01.01.2024'}</span>
              </div>
            </div>

            <div
              className={styles.descriptionia}
              dangerouslySetInnerHTML={{ __html: data?.desc }}
            />
            <div className={styles.commentia}>
              <Comments postSlug={slug} />
            </div>
          </div>
          <Menu />

          </div>

          </div>
        </div>
      </div>



  );
};

export default SinglePage;
