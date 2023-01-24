import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { ArticlePreview } from "../../";
import { FormProduct } from "../components";

import styles from "../selfArticle.module.css";

export const SelfArticle = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.content_self_preview}>
      <div className={styles.container}>
        <div className={styles.nav_return}>
          <div className={styles.return}>
            <BsArrowLeft onClick={() => navigate(-1)} />
            <p>Nueva publicación</p>
          </div>
          <div className={styles.button_post}>
            <button>Publicar</button>
          </div>
        </div>

        <div className={styles.box_global_info}>
          <FormProduct />
        </div>
      </div>

      <ArticlePreview />
    </div>
  );
};
