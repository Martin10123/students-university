import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";
import { FirebaseAuth } from "../../firebase";
import { useForm } from "../../hook";
import { MessageError, ValidatorFormRecover } from "../helpers";

import styles from "./recover.module.css";

const formRecover = {
  email: "",
};

export const RecoverAccount = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isLoadingForm, setIsLoadingForm] = useState(false);

  const { email, emailValid, isFormValid, onInputChange } = useForm(
    formRecover,
    ValidatorFormRecover
  );

  const onSubmitForm = async () => {
    if (!isFormValid) return setFormSubmitted(true);

    setIsLoadingForm(true);

    try {
      await sendPasswordResetEmail(FirebaseAuth, email);
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setErrorMessage("No pudimos encontrar este usuario");
      } else {
        setErrorMessage(error.message);
      }
    }

    setIsLoadingForm(false);
  };

  return (
    <div className={styles.container}>
      <Link to="/auth/login" className={styles.return_button}>
        <BsArrowLeft />
      </Link>
      <div className={styles.content}>
        <h2>Recuperar tu cuenta</h2>

        <input
          type="text"
          placeholder="Recuperar cuenta..."
          name="email"
          value={email}
          onChange={onInputChange}
        />

        <MessageError
          errorActive={!!emailValid && formSubmitted}
          textError={emailValid || ""}
        />

        <MessageError errorActive={!!errorMessage} textError={errorMessage} />

        <button
          className={styles.button_recover}
          disabled={isLoadingForm}
          onClick={onSubmitForm}
        >
          Recuperar
        </button>
      </div>
    </div>
  );
};
