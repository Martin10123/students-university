import { CgProfile } from "react-icons/cg";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { FiMessageSquare } from "react-icons/fi";

import { imagenStore } from "../../../../assets";

import styles from "./cardProduct.module.css";

export const CardProduct = () => {
  return (
    <div className={styles.content_card}>
      <figure className={styles.image}>
        <img src={imagenStore} alt="Producto" />
      </figure>

      <div className={styles.info_product}>
        <p className={styles.name_product}>Clavos de acero</p>

        <div className={styles.prices_state_product}>
          <p>$ 300.000</p>
          <p>Nuevo</p>
        </div>

        <div className={styles.buttons_products}>
          <button className={styles.button_product}>
            <CgProfile />
          </button>
          <button className={styles.button_product}>
            <FiMessageSquare />
          </button>
          <button className={styles.button_product}>
            <FcLikePlaceholder />
            <FcLike />
          </button>
        </div>
      </div>
    </div>
  );
};
