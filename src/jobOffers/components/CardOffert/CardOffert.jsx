import styles from "./cardOffert.module.css";

export const CardOffert = () => {
  const text =
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit, nam commodi doloremque deleniti minus doloribus maximec nemo. Itaque fugit ab, ducimus voluptatem, odit nesciunt istec magni quos quibusdam, neque consequatur. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit, nam commodi doloremque deleniti minus doloribus maxime nemo. Itaque fugit ab, ducimus voluptatem, odit nesciunt iste magni quos quibusdam, neque consequatur.";

  return (
    <div className={styles.info_card}>
      <h2 className={styles.name_offert}>Servicio al cliente</h2>
      <p className={styles.desc_offert}>{text.substring(0, 120) + "..."}</p>
      <div className={styles.box_requirement_offert}>
        <p>Requisitos</p>

        <p>Ser pilo</p>
        <p>Ser humilde</p>
        <p>Ser proactivo</p>
        <p>Ser amable</p>
      </div>

      <div className={styles.buttons_card}>
        <button>Ver oferta</button>
      </div>
    </div>
  );
};
