import { AiOutlineFieldNumber } from "react-icons/ai";
import { BiRename } from "react-icons/bi";
import { BsPhone } from "react-icons/bs";
import { FaUniversalAccess } from "react-icons/fa";
import { FcIdea } from "react-icons/fc";
import { GiBrain } from "react-icons/gi";
import { MdAlternateEmail } from "react-icons/md";

import styles from "./addOffert.module.css";

export const ContentSeveralInfo = ({ data = ["Aprender ingles"] }) => {
  return (
    <div className={styles.content_requirement_selected}>
      {data.map((info) => (
        <p key={info}>{info}</p>
      ))}
    </div>
  );
};

export const AddOffert = ({ setOpenAddOffert }) => {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h2>Agregar oferta</h2>

        <div className={styles.form}>
          <div className={styles.content_form_input}>
            <BiRename />
            <input
              className={styles.input_form}
              type="text"
              placeholder="Nombre de la oferta..."
            />
          </div>

          <textarea
            className={styles.textarea_form}
            name=""
            placeholder="Descripción del perfil que buscas..."
          />

          <div className={styles.content_form_input}>
            <MdAlternateEmail />
            <input
              className={styles.input_form}
              type="email"
              placeholder="Ingresa el o los correos para enviar la CV..."
            />
          </div>

          <ContentSeveralInfo />

          <div className={styles.content_form_input}>
            <AiOutlineFieldNumber />
            <input
              className={styles.input_form}
              type="text"
              placeholder="Cuantos trabajadores buscan?..."
            />
          </div>

          <div className={styles.content_form_input}>
            <FcIdea />
            <input
              className={styles.input_form}
              type="text"
              placeholder="Requerimientos necesarios"
            />
          </div>

          <ContentSeveralInfo />

          <div className={styles.content_form_input}>
            <FaUniversalAccess />

            <input
              className={styles.input_form}
              type="number"
              placeholder="Que semestre buscas?..."
            />
          </div>

          <div className={styles.content_form_input}>
            <GiBrain />
            <input
              className={styles.input_form}
              type="text"
              placeholder="Habilidades necesarias..."
            />
          </div>

          <ContentSeveralInfo />

          <div className={styles.buttons}>
            <button className={styles.button_send}>Publicar</button>
            <button
              className={styles.button_send}
              onClick={() => setOpenAddOffert(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
