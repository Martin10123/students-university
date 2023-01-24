import { imagenStore, photoUser } from "../../assets";

import styles from "./articlePreview.module.css";

const ListItem = ({ title }) => {
  return <p className={styles.price}>{title}</p>;
};

export const ArticlePreview = () => {
  return (
    <div className={styles.content_preview}>
      <div className={styles.preview_box}>
        <h2>Vista previa</h2>
        <div className={styles.preview_info}>
          {true ? (
            <div className={styles.content_message}>
              <figure className={styles.figure}>
                <img src={imagenStore} alt="Imagen del producto" />
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
            <h3 className={styles.title}>Titulo</h3>

            <ListItem title="$ 200.000" />

            <ListItem title="publicado en Colombia" />

            <ListItem title="Categoria" />

            <ListItem title="Estado" />

            <div className={styles.content_desc}>
              <p>descripción</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
