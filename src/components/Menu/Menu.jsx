import React from "react";
import styles from "./menu.module.css";
import MenuPosts from "../menuPosts/MenuPosts";
import Menulists from "../menulists/menulists";
import Menulists2 from "../menulists2/menulists2";
import MenuCategories from "../menuCategories/MenuCategories";

const Menu = () => {
 
    return (
      <div className={styles.container}>
        <h2 className={styles.subtitle}>{"What's hot"}</h2>
        <Menulists page={1} cat={""} />
        <h2 className={styles.subtitle2}>{"show more"}</h2>

       
      </div>
    );
  };

export default Menu;
