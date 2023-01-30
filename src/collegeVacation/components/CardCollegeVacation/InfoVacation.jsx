import { Link } from "react-router-dom";

import styles from "./cardCollegeVacation.module.css";

export const InfoVacation = ({ vacation, setOpenListStudents }) => {
  const {
    displayName,
    inscribed,
    phoneNumber,
    start,
    studentsLength,
    subject,
    teacher,
    username,
  } = vacation;

  return (
    <>
      <p className={styles.title_subject}>{subject}</p>
      <p className={styles.title_card}>
        Profesor: <span>{teacher}</span>
      </p>

      <p className={styles.name_creator}>
        Creado por: <Link to={`/${username}`}>{displayName}</Link>
      </p>
      <p className={styles.cellphone}>{phoneNumber}</p>
      <p className={styles.student_required}>
        Estudiantes requeridos: <span>{studentsLength}</span>
      </p>
      <p className={styles.student_required}>
        Restan: <span>{studentsLength - inscribed.length}</span> cupos
      </p>
      <div className={styles.separate_couples}>
        <p>{start}</p>
        <p
          style={{ cursor: "pointer" }}
          onClick={() => setOpenListStudents(true)}
        >
          Inscritos: <span>{inscribed.length}</span>
        </p>
      </div>
    </>
  );
};
