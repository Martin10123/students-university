import styles from "./cardCollegeVacation.module.css";

export const CardCollegeVacation = () => {
  return (
    <div className={styles.info_card}>
      <p className={styles.title_subject}>Ingles</p>
      <p className={styles.title_card}>
        Profesor: <span>Luis perez</span>
      </p>

      <p className={styles.name_creator}>
        Creado por: <span>Martin Elias</span>
      </p>
      <p className={styles.cellphone}>300-000-0000</p>
      <p className={styles.student_required}>
        Estudiantes requeridos: <span>10</span>
      </p>
      <p className={styles.student_required}>
        Restan: <span>10</span> cupos
      </p>
      <div className={styles.separate_couples}>
        <p>20-01-2023</p>
        <p>
          Inscritos: <span>2</span>
        </p>
      </div>

      <div className={styles.buttons_card}>
        <button>Inscribirme</button>
        <button>No interesa</button>
      </div>

      <div className={styles.button_only_creator}>
        <button className={styles.button_close_poll}>Cerrar encuesta</button>
      </div>
    </div>
  );
};
