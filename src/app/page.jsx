import Link from "next/link";
import styles from "./homepage.module.css";
import Featured from "@/components/featured/Featured";
import CategoryList from "@/components/categoryList/CategoryList";
import CardList from "@/components/cardList/CardList";
import SidebarCategoryList from "@/components/SidebarcategoryList/SidebarCategoryList";
import Menu from "@/components/Menu/Menu";
import CarouselList from "@/components/carouselList/CarouselList";
import Controls from "@/components/Controls";
import Trending from "@/components/Trending";
import AddIcon from "@/components/Addicon";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import AddIcon2 from "@/components/Addicon2";
export default function Home({ searchParams }) {
  const page = parseInt(searchParams.page) || 1;

  return (
    <div className={styles.container}>
      <div
        className={styles.trendingWrapper}
      >
        <Trending />
      </div>

<Navbar />
<AddIcon />

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
  <Footer />
</div>
</div>
  );
}
    