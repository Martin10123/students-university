import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { photoUser } from "../../../assets";
import { firebaseDB } from "../../../firebase";
import { shortName } from "../../../helpers";

import styles from "./viewListStudents.module.css";

export const CardListStudent = ({ isTheCreator, user, idDoc }) => {
  const { displayName, photoUrl, subject, uid, username } = user;

  const navigate = useNavigate();

  const onDeleteUserInscribed = async () => {
    try {
      await updateDoc(doc(firebaseDB, `collegeVacation/${idDoc}`), {
        inscribed: arrayRemove(uid),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={isTheCreator ? {} : { cursor: "pointer" }}
      className={styles.list_item}
      onClick={isTheCreator ? () => {} : () => navigate(`/${username}`)}
    >
      <img
        className={styles.img_user}
        src={photoUrl ? photoUrl : photoUser}
        alt="Foto de perfil"
      />
      <div className={styles.name_carrer}>
        <p>{shortName(displayName)}</p>
        <p>{subject}</p>
      </div>

      {isTheCreator && (
        <div className={styles.buttons_user}>
          <FaUserCircle onClick={() => navigate(`/${username}`)} />

          <BiTrashAlt onClick={onDeleteUserInscribed()} />
        </div>
      )}
    </div>
  );
};
