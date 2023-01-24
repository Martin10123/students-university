import { CgProfile } from "react-icons/cg";
import { FiMessageSquare } from "react-icons/fi";
import { Link } from "react-router-dom";
import { photoUser } from "../../../assets";

import styles from "./cardStudents.module.css";

export const CardStudents = () => {
  return (
    <div className={styles.card_info}>
      <figure className={styles.image_prof}>
        <img src={photoUser} alt="Foto del profesional" />
      </figure>
      <div className={styles.content_all_info}>
        <div className={styles.name_profession}>
          <p>{"displayName"}</p>
          <p>{"subject"}</p>
        </div>
        <div className={styles.appoi_select_subject}>
          <p>{"subjectSelected"}</p>
        </div>
        <div className={styles.container_select_appoi}>
          <div className={styles.appoi_select}>
            <p>{"phoneNumber"}</p>
          </div>
          <div className={styles.appoi_select}>
            <p>{"2"} semestre</p>
          </div>
          <div className={styles.appoi_select}>
            <p>Votos buenos: 2</p>
          </div>
          <div className={styles.appoi_select}>
            <p>Votos malos: 2</p>
          </div>
        </div>

        <div className={styles.container_buttons}>
          <Link to={`/`}>
            <CgProfile />
            Ver perfil
          </Link>
          <button>
            <FiMessageSquare />
            Chatear
          </button>
        </div>
      </div>
    </div>
  );
};
