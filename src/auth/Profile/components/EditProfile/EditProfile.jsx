import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { firebaseAuth, firebaseDB } from "../../../../firebase";
import { allSubject } from "../../../../helpers";
import { useForm } from "../../../../hook";
import { FilterOptions } from "../../../../mainApp";
import { MessageError, validatorFormEditProfile } from "../../../helpers";
import { useRegister } from "../../../Register/hook/useRegister";

import styles from "./editProfile.module.css";

export const EditProfile = ({ setOpenEditProfile, userSelected }) => {
  const {
    subject,
    displayName,
    phoneNumber,
    selectFormUser,
    semester,
    subjectSelectGood,
    idDoc,
    uid,
  } = userSelected;

  const { selectSubject, onSelectSubjects } = useRegister();
  const [openFilter, setOpenFilter] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);

  const {
    newSubject,
    newDisplayName,
    formValidation,
    isFormValid,
    onInputChange,
    newPhoneNumber,
    newSelectFormUser,
    newSemester,
  } = useForm(
    {
      newSubject: subject,
      newDisplayName: displayName,
      newPhoneNumber: phoneNumber,
      newSelectFormUser: selectFormUser,
      newSemester: semester,
    },
    validatorFormEditProfile
  );

  const {
    newSubjectValid,
    newDisplayNameValid,
    newPhoneNumberValid,
    newSemesterValid,
  } = formValidation;

  const onSubmitEdit = async () => {
    if (!isFormValid) return setFormSubmitted(true);

    setIsLoadingButton(true);

    const formEditUser = {
      displayName: newDisplayName,
      phoneNumber: newPhoneNumber,
      selectFormUser: newSelectFormUser || selectFormUser,
      subjectSelectGood:
        selectSubject.length === 0 ? subjectSelectGood : selectSubject,
      semester: newSemester,
      subject: newSubject,
      idDoc,
    };

    try {
      const docRef = doc(firebaseDB, "users", uid);

      await updateDoc(docRef, {
        ...formEditUser,
      });

      await updateProfile(firebaseAuth.currentUser, {
        displayName: newDisplayName,
      });

      setIsLoadingButton(false);
      setOpenEditProfile(false);
    } catch (error) {
      console.log(error);
      setIsLoadingButton(false);
    }
  };

  return (
    <div className={styles.container_profile}>
      <div className={styles.content_profile}>
        <h2>Editar perfil</h2>

        <div className={styles.form}>
          <input
            className={styles.form_input}
            type="text"
            placeholder="Editar nombre..."
            name="newDisplayName"
            value={newDisplayName}
            onChange={onInputChange}
          />

          <MessageError
            errorActive={!!newDisplayNameValid && formSubmitted}
            textError={newDisplayNameValid || ""}
          />

          <input
            className={styles.form_input}
            type="number"
            placeholder="Número de telefono..."
            name="newPhoneNumber"
            value={newPhoneNumber}
            onChange={onInputChange}
          />

          <MessageError
            errorActive={!!newPhoneNumberValid && formSubmitted}
            textError={newPhoneNumberValid || ""}
          />

          <input
            className={styles.form_input}
            type="text"
            placeholder="Editar carrera..."
            name="newSubject"
            value={newSubject}
            onChange={onInputChange}
          />

          <MessageError
            textError={newSubjectValid || ""}
            errorActive={!!newSubjectValid && formSubmitted}
          />

          <input
            className={styles.form_input}
            type="number"
            placeholder="Editar semestre..."
            name="newSemester"
            value={newSemester}
            onChange={onInputChange}
          />

          <MessageError
            textError={newSemesterValid || ""}
            errorActive={!!newSemesterValid && formSubmitted}
          />

          <select
            className={styles.form_select}
            name="newSelectFormUser"
            value={newSelectFormUser}
            onChange={onInputChange}
          >
            <option value="Brindar">Quiero brindar servicios</option>
            <option value="Buscar">Quiero buscar servicio</option>
          </select>

          <div
            className={styles.filter_options}
            onClick={() => setOpenFilter(true)}
          >
            <p>En que eres bueno? Elige!!</p>
          </div>

          <MessageError
            textError="Debes elegir por lo menos un area"
            errorActive={selectSubject.length === 0 && formSubmitted}
          />

          {openFilter && (
            <FilterOptions
              choosedBefore={selectSubject}
              data={allSubject}
              onSelectData={onSelectSubjects}
              setOpenFilter={setOpenFilter}
            />
          )}

          {selectSubject.length !== 0 && (
            <div className={styles.box_content_subject}>
              {selectSubject.map((subject) => (
                <p key={subject} onClick={() => onSelectSubjects(subject)}>
                  {subject}
                </p>
              ))}
            </div>
          )}

          <div className={styles.buttons_edit_profile}>
            <button
              className={styles.button_edit}
              disabled={isLoadingButton}
              onClick={onSubmitEdit}
            >
              {isLoadingButton ? "Cargando..." : "Guardar"}
            </button>
            <button
              className={styles.button_edit}
              disabled={isLoadingButton}
              onClick={() => setOpenEditProfile(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
