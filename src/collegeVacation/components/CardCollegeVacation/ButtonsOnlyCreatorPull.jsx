import { doc, updateDoc } from "firebase/firestore";
import { firebaseDB } from "../../../firebase";

import styles from "./cardCollegeVacation.module.css";

export const ButtonsOnlyCreatorPull = ({
  infoUserActive,
  setOpenListStudents,
  vacation,
}) => {
  const { uid, openPull, idDoc } = vacation;

  const onClosePullVacation = async () => {
    try {
      await updateDoc(doc(firebaseDB, `collegeVacation/${idDoc}`), {
        openPull: !openPull,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {infoUserActive?.uid === uid && (
        <div className={styles.button_only_creator}>
          <button
            className={styles.button_see_students}
            onClick={() => setOpenListStudents(true)}
          >
            Ver inscritos
          </button>
          <button
            className={styles.button_close_poll}
            style={{
              background: !openPull ? "#ff0000" : "transparent",
              color: !openPull ? "#fff" : "#ff0000",
            }}
            onClick={onClosePullVacation}
          >
            {openPull ? "Cerrar encuesta" : "Encuesta cerrada"}
          </button>
        </div>
      )}
    </>
  );
};
