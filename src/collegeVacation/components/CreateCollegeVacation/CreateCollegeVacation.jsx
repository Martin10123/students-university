import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { AiOutlineEdit, AiOutlineFieldNumber } from "react-icons/ai";
import { FcCancel } from "react-icons/fc";
import { GiTeacher } from "react-icons/gi";
import { IoCalendarNumberOutline, IoCreateOutline } from "react-icons/io5";
import { MessageError } from "../../../auth/helpers";
import { firebaseDB } from "../../../firebase";
import { shortName } from "../../../helpers";
import { useForm } from "../../../hook";
import { ValidatorFormCollege } from "../helpers/validotorCollege";

import styles from "./createCollegeVacation.module.css";

const dataForm = {
  start: "",
  studentsLength: "",
  subject: "",
  teacher: "",
};

export const CreateCollegeVacation = ({ setOpenCreator, infoUserActive }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [startLoadingLogin, setStartLoadingLogin] = useState(false);

  const {
    subject,
    teacher,
    studentsLength,
    start,
    onInputChange,
    formValidation,
    isFormValid,
  } = useForm(dataForm, ValidatorFormCollege);

  const { subjectValid, teacherValid, studentsLengthValid, startValid } =
    formValidation;

  const onCreateVacation = async () => {
    if (!isFormValid) return setFormSubmitted(true);

    setStartLoadingLogin(true);

    try {
      await addDoc(collection(firebaseDB, "collegeVacation"), {
        uid: infoUserActive?.uid,
        displayName: shortName(infoUserActive?.displayName),
        phoneNumber: infoUserActive?.phoneNumber,
        username: infoUserActive?.username,
        subject,
        teacher,
        studentsLength: Number(studentsLength),
        start,
        inscribed: [],
        openPull: true,
      });
      setStartLoadingLogin(false);
      setOpenCreator(false);
    } catch (error) {
      console.log(error);
      setStartLoadingLogin(false);
    }
  };

  return (
    <div className={styles.container_form}>
      <div className={styles.content_form}>
        <h2>Agregar vacacional</h2>
        <hr />
        <div className={styles.input_form}>
          <AiOutlineEdit />
          <input
            type="text"
            name="subject"
            value={subject}
            onChange={onInputChange}
            placeholder="Nombre de la materia..."
          />
        </div>
        <MessageError
          errorActive={!!subjectValid && formSubmitted}
          textError={subjectValid || ""}
        />
        <div className={styles.input_form}>
          <GiTeacher />
          <input
            type="text"
            name="teacher"
            value={teacher}
            onChange={onInputChange}
            placeholder="Profesor..."
          />
        </div>
        <MessageError
          errorActive={!!teacherValid && formSubmitted}
          textError={teacherValid || ""}
        />
        <div className={styles.input_form}>
          <AiOutlineFieldNumber />
          <input
            type="number"
            name="studentsLength"
            value={studentsLength}
            onChange={onInputChange}
            placeholder="Cuantos estudiantes necesitas..."
          />
        </div>
        <MessageError
          errorActive={!!studentsLengthValid && formSubmitted}
          textError={studentsLengthValid || ""}
        />
        <div className={styles.input_form}>
          <IoCalendarNumberOutline />
          <input
            type="date"
            name="start"
            value={start}
            onChange={onInputChange}
          />
        </div>
        <MessageError
          errorActive={!!startValid && formSubmitted}
          textError={startValid || ""}
        />

        <div className={styles.buttons_form}>
          <button disabled={startLoadingLogin} onClick={onCreateVacation}>
            <IoCreateOutline /> {startLoadingLogin ? "Cargando..." : "Crear"}
          </button>
          <button
            disabled={startLoadingLogin}
            onClick={() => setOpenCreator(false)}
          >
            <FcCancel /> Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};
