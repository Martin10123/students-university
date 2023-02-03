import styles from "../pages/offersLayout.module.css";

export const ButtonsAddOffers = ({ startLoading, onSubmitValues, title }) => {
  return (
    <div className={styles.buttons}>
      <button
        className={styles.button_send}
        disabled={startLoading}
        onClick={onSubmitValues}
      >
        {startLoading
          ? "Cargando..."
          : `${title === "Actualizar oferta" ? "Actualizar" : "Publicar"}`}
      </button>
    </div>
  );
};
