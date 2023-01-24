import { useState } from "react";

import { BiAddToQueue } from "react-icons/bi";
import { IoMdArrowDropdown } from "react-icons/io";
import { useScroll } from "../../../hook";
import { FilterOptions } from "../../../mainApp";
import {
  categoriesStoreSelf,
  state_product,
} from "../../helpers/CategoriesStore";

import styles from "../selfArticle.module.css";

export const FormProduct = () => {
  const [openCategories, setopenCategories] = useState(false);
  const [openState, setopenState] = useState(false);

  useScroll([openCategories, openState]);

  return (
    <div className={styles.form}>
      <div className={styles.option_product}>
        <BiAddToQueue />
        <p>Agregar imagen</p>
      </div>

      <input id="inputStore" type="file" style={{ display: "none" }} />

      <input
        className={styles.input_form}
        type="text"
        placeholder="Nombre del producto..."
      />

      <input
        className={styles.input_form}
        type="number"
        placeholder="Precio..."
      />

      <div
        className={styles.option_product}
        onClick={() => setopenCategories(true)}
      >
        <p>Categoria</p>
        <IoMdArrowDropdown />
      </div>

      {openCategories && (
        <FilterOptions
          data={categoriesStoreSelf}
          setOpenFilter={setopenCategories}
        />
      )}

      <div className={styles.option_product} onClick={() => setopenState(true)}>
        <p>Estado</p>
        <IoMdArrowDropdown />
      </div>

      {openState && (
        <FilterOptions data={state_product} setOpenFilter={setopenState} />
      )}

      <textarea
        name="productDesc"
        placeholder="Descripción del producto..."
        className={styles.textarea_desc}
      />
    </div>
  );
};
