import { useState } from "react";
import { allSubject } from "../../../helpers";
import { useScroll } from "../../../hook";
import { FilterOptions } from "../../../mainApp";
import { MessageError } from "../../helpers";
import styles from "../register.module.css";

export const SubjectSemesterOptions = ({
  formSubmitted,
  formValidation,
  onInputChange,
  onSelectSubjects,
  selectFormUser,
  selectSubject,
  semester,
  subject,
}) => {
  const [openFilter, setOpenFilter] = useState(false);
  useScroll([openFilter]);

  const { subjectValid, semesterValid } = formValidation;

  const yesWantWork = selectFormUser === "Brindar" ? true : false;

  return (
    <>
      <input
        className={styles.form_input}
        type="text"
        placeholder="Carrera a la que asistes..."
        name="subject"
        value={subject}
        onChange={onInputChange}
      />

      <MessageError
        textError={subjectValid || ""}
        errorActive={!!subjectValid && formSubmitted}
      />

      <input
        className={styles.form_input}
        type="number"
        placeholder="Semestre que cursas..."
        name="semester"
        value={semester}
        onChange={onInputChange}
      />

      <MessageError
        textError={semesterValid || ""}
        errorActive={!!semesterValid && formSubmitted}
      />

      <select
        className={styles.form_select}
        name="selectFormUser"
        value={selectFormUser}
        onChange={onInputChange}
      >
        <option value="Brindar">Quiero brindar servicios</option>
        <option value="Buscar">Quiero buscar servicio</option>
      </select>

      <div
        style={{ height: "5rem" }}
        className={styles.filter_options}
        onClick={() => setOpenFilter(yesWantWork)}
      >
        <p>
          {yesWantWork
            ? "En que eres bueno? Elige!!"
            : "Solo puedes usar esta opción si quieres brindar servicios"}
        </p>
      </div>

      <MessageError
        textError="Debes elegir por lo menos un area"
        errorActive={selectSubject.length === 0 && formSubmitted && yesWantWork}
      />

      {openFilter && (
        <FilterOptions
          choosedBefore={selectSubject}
          data={allSubject}
          onSelectData={onSelectSubjects}
          setOpenFilter={setOpenFilter}
        />
      )}

      <div className={styles.box_content_subject}>
        {selectSubject.map((subject) => (
          <p key={subject} onClick={() => onSelectSubjects(subject)}>
            {subject}
          </p>
        ))}
      </div>
    </>
  );
};
