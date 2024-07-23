import Link from "next/link";
import styles from "./homepage.module.css";
import Featured from "@/components/featured/Featured";
import CategoryList from "@/components/categoryList/CategoryList";
import CardList from "@/components/cardList/CardList";
import Menu from "@/components/Menu/Menu";
import SidebarCategoryList from "@/components/SidebarcategoryList/SidebarCategoryList";
import CarouselList from "@/components/carouselList/CarouselList";

export default function Home({ searchParams }) {
  const page = parseInt(searchParams.page) || 1;

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <SidebarCategoryList />
        
      </div>

      <div className={styles.mainContent}>
      <CategoryList />

        <CarouselList page={page} />
        <div className={styles.content1}>
          <CardList page={page} />
          <Menu />

        </div>
      </div>
    </div>
  );
}
