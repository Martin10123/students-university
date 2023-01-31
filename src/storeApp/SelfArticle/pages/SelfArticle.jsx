import { addDoc, collection } from "firebase/firestore";
import { useContext, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { ArticlePreview } from "../../";
import { AuthUserContext } from "../../../context";
import { firebaseDB } from "../../../firebase";
import { fileUpload } from "../../../helpers";
import { useForm } from "../../../hook";
import { validatorFormStore } from "../../helpers";
import { FormProduct } from "../components";

import styles from "../selfArticle.module.css";

const dataForm = {
  name: "",
  price: 0,
  productDesc: "",
};

export const SelfArticle = () => {
  const { infoUserActive } = useContext(AuthUserContext);
  const navigate = useNavigate();
  const { formState, formValidation, isFormValid, onInputChange } = useForm(
    dataForm,
    validatorFormStore
  );
  const [category, setCategory] = useState("");
  const [stateProduct, setStateProduct] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [startLoadingLogin, setStartLoadingLogin] = useState(false);
  const [photoProduct, setPhotoProduct] = useState("");

  const onSubmitFormStore = async () => {
    if (
      !isFormValid ||
      category.trim() === "" ||
      stateProduct.trim() === "" ||
      photoProduct === ""
    )
      return setFormSubmitted(true);

    setStartLoadingLogin(true);
    try {
      const file = await fileUpload(photoProduct);

      await addDoc(collection(firebaseDB, "storeApp"), {
        ...formState,
        category,
        displayName: infoUserActive.displayName,
        photoProduct: file,
        stateProduct,
        uid: infoUserActive.uid,
        username: infoUserActive.username,
        votesBad: [],
        votesGood: [],
      });

      navigate("/store");

      setStartLoadingLogin(false);
    } catch (error) {
      console.log(error);
      setStartLoadingLogin(false);
    }
  };

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
