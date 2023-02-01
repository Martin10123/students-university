import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthUserContext } from "../../context";
import { firebaseDB } from "../../firebase";
import { fileUpload } from "../../helpers";
import { useForm } from "../../hook";
import { validatorFormStore } from "../helpers";

export const useFormProduct = ({ valuesUpdate }) => {
  const {
    nameU,
    priceU,
    productDescU,
    categoryU,
    stateProductU,
    photoProductU,
  } = valuesUpdate;

  const { infoUserActive } = useContext(AuthUserContext);
  const navigate = useNavigate();
  const { formState, formValidation, isFormValid, onInputChange } = useForm(
    {
      name: nameU,
      price: priceU,
      productDesc: productDescU,
    },
    validatorFormStore
  );
  const [category, setCategory] = useState(categoryU);
  const [stateProduct, setStateProduct] = useState(stateProductU);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [startLoadingLogin, setStartLoadingLogin] = useState(false);
  const [photoProduct, setPhotoProduct] = useState(photoProductU);

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

  const onSubmitUdpateForm = async ({ product, setOpenEditProduct }) => {
    if (!isFormValid) return setFormSubmitted(true);

    setStartLoadingLogin(true);

    try {
      let file;

      if (photoProduct) {
        file = await fileUpload(photoProduct);
      }

      const dataToFire = {
        name: formState.name || product.name,
        price: formState.price || product.price,
        productDesc: formState.productDesc || product.productDesc,
        photoProduct: file || product.photoProduct,
        category: category || product.category,
        stateProduct: stateProduct || product.stateProduct,
      };

      await updateDoc(doc(firebaseDB, `storeApp/${product.idDoc}`), dataToFire);

      setStartLoadingLogin(false);
      setOpenEditProduct(false);
    } catch (error) {
      console.log(error);
      setStartLoadingLogin(false);
    }
  };

  return {
    category,
    formState,
    formSubmitted,
    formValidation,
    infoUserActive,
    isFormValid,
    navigate,
    onInputChange,
    onSubmitFormStore,
    onSubmitUdpateForm,
    photoProduct,
    setCategory,
    setFormSubmitted,
    setPhotoProduct,
    setStartLoadingLogin,
    setStateProduct,
    startLoadingLogin,
    stateProduct,
  };
};
