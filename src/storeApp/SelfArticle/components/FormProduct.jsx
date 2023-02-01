import { useRef, useState } from "react";

import { BiAddToQueue } from "react-icons/bi";
import { IoMdArrowDropdown } from "react-icons/io";
import { MessageError } from "../../../auth/helpers";
import { useScroll } from "../../../hook";
import { FilterOptions } from "../../../mainApp";
import {
  categoriesStoreSelf,
  state_product,
} from "../../helpers/CategoriesStore";

import styles from "../selfArticle.module.css";

export const FormProduct = ({
  category,
  formState,
  formSubmitted,
  formValidation,
  onInputChange,
  photoProduct,
  setCategory,
  setPhotoProduct,
  setStateProduct,
  stateProduct,
  isUpdateValues,
}) => {
  const [openCategories, setopenCategories] = useState(false);
  const [openState, setopenState] = useState(false);
  const fileInputRef = useRef();

  const { name, price, productDesc } = formState;
  const { nameValid, priceValid, productDescValid } = formValidation;

  useScroll([openCategories, openState]);

  return (
    <div className={styles.form}>
      <div
        className={styles.option_product}
        onClick={() => fileInputRef.current.click()}
      >
        <BiAddToQueue />
        <p>{photoProduct ? "1 foto" : "Agregar imagen"}</p>
      </div>

      {!isUpdateValues && (
        <MessageError
          textError="Suba una foto del producto"
          errorActive={photoProduct === "" && formSubmitted}
        />
      )}

      <input
        id="inputStore"
        ref={fileInputRef}
        onChange={({ target }) => setPhotoProduct(target.files[0])}
        type="file"
        style={{ display: "none" }}
      />

      <input
        className={styles.input_form}
        type="text"
        placeholder="Nombre del producto..."
        name="name"
        value={name}
        onChange={onInputChange}
      />
      <MessageError
        textError={nameValid || ""}
        errorActive={!!nameValid && formSubmitted}
      />

      <input
        className={styles.input_form}
        type="number"
        placeholder="Precio..."
        name="price"
        value={price}
        onChange={onInputChange}
      />
      <MessageError
        textError={priceValid || ""}
        errorActive={!!priceValid && formSubmitted}
      />

      <div
        className={styles.option_product}
        onClick={() => setopenCategories(true)}
      >
        <p>{category ? category : "Categoria"}</p>
        <IoMdArrowDropdown />
      </div>

      <MessageError
        textError="Elige una categoria"
        errorActive={category.trim() === "" && formSubmitted}
      />

      {openCategories && (
        <FilterOptions
          choosedBefore={[category]}
          data={categoriesStoreSelf}
          onSelectData={setCategory}
          setOpenFilter={setopenCategories}
        />
      )}

      <div className={styles.option_product} onClick={() => setopenState(true)}>
        <p>{stateProduct ? stateProduct : "Estado"}</p>
        <IoMdArrowDropdown />
      </div>

      <MessageError
        textError="Elige un estado para el producto"
        errorActive={stateProduct.trim() === "" && formSubmitted}
      />

      {openState && (
        <FilterOptions
          choosedBefore={[stateProduct]}
          data={state_product}
          onSelectData={setStateProduct}
          setOpenFilter={setopenState}
        />
      )}

      <textarea
        name="productDesc"
        value={productDesc}
        onChange={onInputChange}
        placeholder="Descripción del producto..."
        className={styles.textarea_desc}
      />

      <MessageError
        textError={productDescValid || ""}
        errorActive={!!productDescValid && formSubmitted}
      />
    </div>
  );
};
