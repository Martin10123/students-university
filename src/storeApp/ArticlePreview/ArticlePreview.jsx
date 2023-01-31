import { imagenStore } from "../../assets";

import styles from "./articlePreview.module.css";

const ListItem = ({ title }) => {
  return <p className={styles.price}>{title}</p>;
};

export const ArticlePreview = ({
  category,
  formState,
  photoProduct,
  stateProduct,
}) => {
  const { name, price, productDesc } = formState;

  return (
    <div className={styles.content_preview}>
      <div className={styles.preview_box}>
        <h2>Vista previa</h2>
        <div className={styles.preview_info}>
          {true ? (
            <div className={styles.content_message}>
              <figure className={styles.figure}>
                <img
                  src={
                    photoProduct
                      ? URL.createObjectURL(photoProduct)
                      : imagenStore
                  }
                  alt="Imagen del producto"
                />
              </figure>
            </div>
          ) : (
            <div className={styles.content_message}>
              <span>Vista previa de tu publicación</span>
              <p>
                A medida que crees la publicación, podras ver que aspecto tendrá
                en la store
              </p>
            </div>
          )}

          <div className={styles.info_product}>
            <h3 className={styles.title}>{name || "Titulo"}</h3>

            <ListItem title={Number(price).toLocaleString() || "Precio"} />

            <ListItem title="publicado en Colombia" />

            <ListItem title={category || "Categoria"} />

            <ListItem title={stateProduct || "Estado"} />

            <div className={styles.content_desc}>
              <p>{productDesc || "Descripción"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
