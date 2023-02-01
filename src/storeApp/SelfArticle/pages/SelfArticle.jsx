import { addDoc, collection } from "firebase/firestore";
import { BsArrowLeft } from "react-icons/bs";
import { ArticlePreview } from "../../";
import { firebaseDB } from "../../../firebase";
import { fileUpload } from "../../../helpers";

import { useFormProduct } from "../../Hook/useFormProduct";
import { FormProduct } from "../components";

import styles from "../selfArticle.module.css";

const valuesUpdate = {
  nameU: "",
  priceU: "",
  productDescU: "",
  categoryU: "",
  stateProductU: "",
  photoProductU: "",
};

export const SelfArticle = () => {
  const {
    category,
    formState,
    formSubmitted,
    formValidation,
    isFormValid,
    navigate,
    onInputChange,
    photoProduct,
    setCategory,
    setPhotoProduct,
    setStateProduct,
    startLoadingLogin,
    stateProduct,
    onSubmitFormStore,
  } = useFormProduct({ valuesUpdate });

  return (
    <div className={styles.content_self_preview}>
      <div className={styles.container}>
        <div className={styles.nav_return}>
          <div className={styles.return}>
            <BsArrowLeft onClick={() => navigate(-1)} />
            <p>Nueva publicación</p>
          </div>
          <div className={styles.button_post}>
            <button disabled={startLoadingLogin} onClick={onSubmitFormStore}>
              {startLoadingLogin ? "Cargando" : "Publicar"}
            </button>
          </div>
        </div>

        <div className={styles.box_global_info}>
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
          />
        </div>
      </div>

      <ArticlePreview
        category={category}
        formState={formState}
        photoProduct={photoProduct}
        stateProduct={stateProduct}
      />
    </div>
  );
};
