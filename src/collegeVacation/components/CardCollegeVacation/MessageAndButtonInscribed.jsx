import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firebaseDB } from "../../../firebase";

import styles from "./cardCollegeVacation.module.css";

export const MessageAndButtonInscribed = ({ infoUserActive, vacation }) => {
  const { uid, studentsLength, inscribed, openPull, idDoc } = vacation;
  const includesThisUser = inscribed.includes(infoUserActive?.uid);

  const onInscribedStudents = async () => {
    try {
      await updateDoc(doc(firebaseDB, `collegeVacation/${idDoc}`), {
        inscribed: includesThisUser
          ? arrayRemove(infoUserActive?.uid)
          : arrayUnion(infoUserActive?.uid),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {studentsLength === inscribed.length ? (
        <p className={styles.collegeVacationFull}>
          Ya este vacacional esta completo
        </p>
      ) : (
        <>
          {infoUserActive?.uid !== uid && (
            <div className={styles.buttons_card}>
              {openPull ? (
                <button
                  style={
                    includesThisUser
                      ? { background: "#0099ff", color: "#fff" }
                      : {}
                  }
                  onClick={onInscribedStudents}
                >
                  {includesThisUser ? "Ya inscrito" : "Inscribirme"}
                </button>
              ) : (
                <p className={styles.msg_depend_status}>
                  {!openPull
                    ? "Este vacacional esta momentaneamente cerrado por su creador"
                    : "Este vacacional ya esta completo"}
                </p>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};
