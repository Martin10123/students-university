import { collegeUniversity } from "../../../assets";

import styles from "./welcomeVacation.module.css";

export const WelcomeVacation = ({ setOpenCreator }) => {
  return (
    <div className={styles.content_info_image}>
      <div className={styles.content_info_about_app}>
        <h1 className={styles.title_welcome}>
          Buscas personas para completar un vacacional?
        </h1>
        <p className={styles.title_info}>
          llegaste al lugar correcto, aqui podras crear una encuesta con la que
          las personas que esten interesados en ese vacacional podran unirse,
          podras agregar un limite de personas necesarias para hacerlo, donde
          cada persona que presione unirse dejara su número de telefono para que
          puedan agragarse a Whatsapp o podran hablar por nuestro chat privado.
        </p>

        <div className={styles.buttons}>
          <button
            className={styles.button_create_poll}
            onClick={() => setOpenCreator(true)}
          >
            Crear una
          </button>
          <a href="#found_vacation" className={styles.button_search_vacation}>
            Buscar vacacional
          </a>
        </div>
      </div>

      <figure className={styles.imagen_college_university}>
        <img src={collegeUniversity} alt="Imagen de fondo" />
      </figure>
    </div>
  );
};
