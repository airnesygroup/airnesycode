import Link from "next/link";
import styles from "./newsPage.module.css";
import Featured from "@/components/featured/Featured";
import CategoryList from "@/components/categoryList3/CategoryList";
import Menu from "@/components/Menu/Menu";
import CardList from "@/components/cardList3/CardList";

export default function Home({ searchParams }) {
  const page = parseInt(searchParams.page) || 1;

  return (
    <div className={styles.container}>
      <Featured />
      <CategoryList />
      <div className={styles.content}>
        <CardList page={page}/>
        <Menu />
      </div>
    </div>
  );
}
