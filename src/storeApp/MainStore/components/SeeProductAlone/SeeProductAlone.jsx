import { deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { SureDelete } from "../../../../boxComments/components";
import { firebaseDB } from "../../../../firebase";
import { EditProduct } from "./EditProduct/EditProduct";

import styles from "./seeProductAlone.module.css";

export const SeeProductAlone = ({
  product,
  setOpenViewProductAlone,
  uidUserActive,
}) => {
  const [openSureDelete, setOpenSureDelete] = useState(false);
  const [openEditProduct, setOpenEditProduct] = useState(false);
  const {
    category,
    idDoc,
    name,
    photoProduct,
    price,
    stateProduct,
    uid,
    productDesc,
  } = product;

  const onDeleteProduct = async () => {
    try {
      await deleteDoc(doc(firebaseDB, `storeApp/${idDoc}`));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={styles.container_card_alone}>
        <div
          className={styles.button_close_alone}
          onClick={() => setOpenViewProductAlone(false)}
        ></div>
        <div className={styles.content_card_alone}>
          <div className={styles.card_alone}>
            <img src={photoProduct} alt="Producto" />
            <p className={styles.name_product}>{name}</p>
            <div className={styles.info_aditional}>
              <p>$ {Number(price).toLocaleString()}</p>
              <p>{category}</p>
              <p>{stateProduct}</p>
              <div className={styles.content_desc}>
                <span>{productDesc}</span>
              </div>
            </div>

            {uidUserActive === uid && (
              <div className={styles.buttons_card_alone}>
                <button
                  className={styles.button_alone_update}
                  onClick={() => setOpenEditProduct(true)}
                >
                  <AiOutlineEdit />
                </button>
                <button
                  className={styles.button_alone_delete}
                  onClick={() => setOpenSureDelete(true)}
                >
                  <AiOutlineDelete />
                </button>
              </div>
            )}
          </div>
        </div>
        {openEditProduct && (
          <EditProduct
            product={product}
            setOpenEditProduct={setOpenEditProduct}
          />
        )}
      </div>
      {openSureDelete && (
        <SureDelete
          onDeleteComment={onDeleteProduct}
          setOpenSureDelete={setOpenSureDelete}
        />
      )}
    </>
  );
};
