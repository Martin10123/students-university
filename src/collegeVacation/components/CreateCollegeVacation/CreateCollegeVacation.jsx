import { AiOutlineEdit, AiOutlineFieldNumber } from "react-icons/ai";
import { FcCancel } from "react-icons/fc";
import { GiTeacher } from "react-icons/gi";
import { IoCalendarNumberOutline, IoCreateOutline } from "react-icons/io5";

import styles from "./createCollegeVacation.module.css";

export const CreateCollegeVacation = ({ setOpenCreator }) => {
  return (
    <div className={styles.container_form}>
      <div className={styles.content_form}>
        <h2>Agregar vacacional</h2>
        <hr />
        <div className={styles.input_form}>
          <AiOutlineEdit />
          <input type="text" placeholder="Nombre de la materia..." />
        </div>
        <div className={styles.input_form}>
          <GiTeacher />
          <input type="text" placeholder="Profesor..." />
        </div>
        <div className={styles.input_form}>
          <AiOutlineFieldNumber />
          <input type="number" placeholder="Cuantos estudiantes necesitas..." />
        </div>
        <div className={styles.input_form}>
          <IoCalendarNumberOutline />
          <input type="date" />
        </div>

        <div className={styles.buttons_form}>
          <button>
            <IoCreateOutline /> Crear
          </button>
          <button onClick={() => setOpenCreator(false)}>
            <FcCancel /> Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};
