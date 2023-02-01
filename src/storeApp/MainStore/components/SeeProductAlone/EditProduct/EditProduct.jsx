import { useFormProduct } from "../../../../Hook/useFormProduct";
import { FormProduct } from "../../../../SelfArticle/components";

import styles from "./editProduct.module.css";

export const EditProduct = ({ product, setOpenEditProduct }) => {
  const valuesUpdate = {
    nameU: product.name,
    priceU: product.price,
    productDescU: product.productDesc,
    categoryU: product.category,
    stateProductU: product.stateProduct,
    photoProductU: product.photoProduct,
  };

  const {
    category,
    formState,
    formSubmitted,
    formValidation,
    isFormValid,
    onInputChange,
    photoProduct,
    setCategory,
    setPhotoProduct,
    setStateProduct,
    startLoadingLogin,
    stateProduct,
    onSubmitUdpateForm,
  } = useFormProduct({ valuesUpdate });

  return (
    <div className={styles.edit_product}>
      <div className={styles.edit_content}>
        <FormProduct
          category={category}
          formState={formState}
          formSubmitted={formSubmitted}
          formValidation={formValidation}
          onInputChange={onInputChange}
          photoProduct={photoProduct}
          setCategory={setCategory}
          setPhotoProduct={setPhotoProduct}
          setStateProduct={setStateProduct}
          stateProduct={stateProduct}
          isFormValid={isFormValid}
          isUpdateValues={true}
        />

        <div className={styles.content_update_product}>
          <button
            className={styles.update_product_update}
            disabled={startLoadingLogin}
            onClick={() => onSubmitUdpateForm({ product, setOpenEditProduct })}
          >
            {startLoadingLogin ? "Cargando..." : "Actualizar"}
          </button>
          <button
            className={styles.update_product_cancel}
            disabled={startLoadingLogin}
            onClick={() => setOpenEditProduct(false)}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};
