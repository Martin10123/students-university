import { CgProfile } from "react-icons/cg";
import { FiMessageSquare } from "react-icons/fi";
import { Link } from "react-router-dom";
import { photoUser } from "../../../assets";

import styles from "./cardStudents.module.css";

export const CardStudents = ({
  displayName,
  phoneNumber,
  photoUrl,
  semester,
  subject,
  subjectSelectGood,
  username,
}) => {
  return (
    <div className={styles.card_info}>
      <figure className={styles.image_prof}>
        <img src={photoUrl ? photoUrl : photoUser} alt="Foto del profesional" />
      </figure>
      <div className={styles.content_all_info}>
        <div className={styles.name_profession}>
          <p>{displayName}</p>
          <p>{subject}</p>
        </div>
        <div className={styles.appoi_select_subject}>
          {subjectSelectGood.map((subjectSelected) => (
            <p key={subjectSelected}>{subjectSelected}</p>
          ))}
        </div>
        <div className={styles.container_select_appoi}>
          <div className={styles.appoi_select}>
            <p>{phoneNumber}</p>
          </div>
          <div className={styles.appoi_select}>
            <p>{semester} semestre</p>
          </div>
          <div className={styles.appoi_select}>
            <p>Votos buenos: 2</p>
          </div>
          <div className={styles.appoi_select}>
            <p>Votos malos: 2</p>
          </div>
        </div>

        <div className={styles.container_buttons}>
          <Link to={`/${username}`}>
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
