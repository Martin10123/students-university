import { useState } from "react";

import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsFilterLeft, BsFilterRight } from "react-icons/bs";
import { FcLike } from "react-icons/fc";
import { useScroll } from "../../../hook";
import { FilterOptions } from "../../../mainApp";
import { categoriesStoreSelf } from "../../helpers/CategoriesStore";

import { CardProduct, SideBar } from "../components";

import styles from "./mainStore.module.css";

export const MainStore = () => {
  const [openSideBar, setOpenSideBar] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);

  useScroll([openFilter, openSideBar]);

  return (
    <section className={styles.container}>
      <SideBar openSideBar={openSideBar} setOpenSideBar={setOpenSideBar} />

      <div className={styles.content_info}>
        <nav className={styles.content_nav}>
          <BsFilterLeft onClick={() => setOpenSideBar(true)} />
          <p>Store</p>
          <AiOutlineShoppingCart />
        </nav>

        <div className={styles.form}>
          <input
            type="text"
            placeholder="Buscar..."
            className={styles.input_form}
          />
        </div>

        <div className={styles.title}>
          <p>Productos</p>

          <div className={styles.content_options_svg}>
            <div className={styles.search_filter}>
              <BsFilterRight onClick={() => setOpenFilter(true)} />
            </div>

            <div className={styles.search_filter}>
              <FcLike />
            </div>
          </div>
        </div>

        {openFilter && (
          <FilterOptions
            data={categoriesStoreSelf}
            setOpenFilter={setOpenFilter}
          />
        )}

        <div className={styles.container_card}>
          <CardProduct />
        </div>
      </div>
    </section>
  );
};
