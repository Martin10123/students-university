import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";

import {
  NameNumberEmail,
  PasswordBirthdayGender,
  SubjectSemesterOptions,
} from "../components";
import { useRegister } from "../hook/useRegister";

import styles from "../register.module.css";

export const RegisterPage = () => {
  const {
    errorMessage,
    formState,
    formSubmitted,
    formValidation,
    onInputChange,
    onSelectSubjects,
    onSubmitForm,
    selectSubject,
    startLoading,
  } = useRegister();

  return (
    <div className={styles.container}>
      <Link to="/auth/select" className={styles.comeBack_choose}>
        <BsArrowLeft />
      </Link>
      <div className={styles.content}>
        <h2>Registrate</h2>
        <div className={styles.form}>
          <NameNumberEmail
            {...formState}
            formSubmitted={formSubmitted}
            formValidation={formValidation}
            onInputChange={onInputChange}
          />

          <PasswordBirthdayGender
            {...formState}
            formSubmitted={formSubmitted}
            formValidation={formValidation}
            onInputChange={onInputChange}
          />

          <SubjectSemesterOptions
            {...formState}
            formSubmitted={formSubmitted}
            formValidation={formValidation}
            onInputChange={onInputChange}
            onSelectSubjects={onSelectSubjects}
            selectSubject={selectSubject}
          />

          <button
            disabled={startLoading}
            className={styles.button}
            onClick={onSubmitForm}
          >
            {startLoading ? "Cargando..." : "Registrarse"}
          </button>

          {errorMessage && <p className={styles.show_error}>{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
};
