
import CardList from "@/components/cardList/CardList";
import styles from "./blogPage.module.css";
import Menu from "@/components/Menu/Menu";
import Navbar from "@/components/navbar/Navbar";
import SidebarCategoryList from "@/components/SidebarcategoryList/SidebarCategoryList";

const BlogPage = ({ searchParams }) => {
  const page = parseInt(searchParams.page) || 1;
  const { cat } = searchParams;

  return (
  <div className={styles.container}>
 

 <div className={styles.navbar}>
    <Navbar />

 </div>
    <div className={styles.menu}>
      <SidebarCategoryList />
    </div>
    <div className={styles.mainContent}>


    <div className={styles.content1}>
      
  <div className={styles.mainContent5}>
  <h1 className={styles.title}>{cat}</h1>
 <CardList page={page} cat={cat} />
    </div>

   

     <Menu/>

</div>

    </div>
  </div>


  );
};

export default BlogPage;
