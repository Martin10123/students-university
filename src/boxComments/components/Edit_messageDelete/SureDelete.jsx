import styles from "./styles.module.css";

export const SureDelete = ({ setOpenSureDelete, onDeleteComment }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2>Seguro que quieres borrarlo?</h2>
        <div className={styles.buttons}>
          <button onClick={onDeleteComment}>Borrar</button>
          <button onClick={() => setOpenSureDelete(false)}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};
