
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
              <Navbar />
      <div className={styles.menu}>
        <SidebarCategoryList />
      </div>

      <div className={styles.content}>

      <h1 className={styles.title}>{cat} </h1>
      
      <div className={styles.content1}>

        <CardList page={page} cat={cat}/>
        <Menu />
        </div>

      </div>
    </div>
  );
};

export default BlogPage;
