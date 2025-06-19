import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

import { AiOutlineMail } from "react-icons/ai";
import { BsArrowLeft } from "react-icons/bs";
import { CiLogin } from "react-icons/ci";
import { Link } from "react-router-dom";
import { RiLockPasswordLine } from "react-icons/ri";

import { firebaseAuth, firebaseDB } from "../../firebase";
import { MessageError, ValidatorFormLogin } from "../helpers";
import { useForm } from "../../hook";

import styles from "./login.module.css";

const formLogin = {
  email: "admin@admin.com",
  password: "admin12345",
};

export const LoginPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [startLoadingLogin, setStartLoadingLogin] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const {
    email,
    emailValid,
    isFormValid,
    onInputChange,
    password,
    passwordValid,
  } = useForm(formLogin, ValidatorFormLogin);

  const onSubmitForm = async (e) => {
    e.preventDefault();

    if (!isFormValid) return setFormSubmitted(true);

    setStartLoadingLogin(true);

    try {
      const { user } = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );

      await updateDoc(doc(firebaseDB, "users", user.uid), {
        isActive: true,
      });

      setStartLoadingLogin(false);
    } catch (error) {
      console.log(error);
      if (error.code === "auth/user-not-found") {
        setErrorMessage("Este usuario no existe");
      } else if (error.code === "auth/wrong-password") {
        setErrorMessage("Contraseña incorrecta");
      } else {
        console.log(error.code);
      }

      setStartLoadingLogin(false);
    }
  };

  return (
    <div className={styles.container}>
      <Link to="/auth/select" className={styles.comeBack_choose}>
        <BsArrowLeft />
      </Link>
      <div className={styles.content}>
        <div className={styles.title}>
          <h2>Login App</h2>
        </div>

        <form onSubmit={onSubmitForm} className={styles.form}>
          <div className={styles.form_box_input}>
            <AiOutlineMail />
            <input
              name="email"
              onChange={onInputChange}
              placeholder="Email..."
              type="text"
              value={email}
            />
          </div>

          <MessageError
            errorActive={!!emailValid && formSubmitted}
            textError={emailValid || ""}
          />

          <div className={styles.form_box_input}>
            <RiLockPasswordLine />
            <input
              name="password"
              onChange={onInputChange}
              placeholder="Contraseña..."
              type="password"
              value={password}
            />
          </div>

          <MessageError
            textError={passwordValid || ""}
            errorActive={!!passwordValid && formSubmitted}
          />
        </form>

        <Link to="/auth/recoverAccount" className={styles.forgot_password}>
          <h5>¿Olvidaste tu contraseña?</h5>
        </Link>

        <div className={styles.buttons}>
          <button
            className={styles.button}
            disabled={startLoadingLogin}
            onClick={onSubmitForm}
          >
            <CiLogin />
            {startLoadingLogin ? "Cargando..." : "Ingresar"}
          </button>

          {errorMessage && <p className={styles.show_error}>{errorMessage}</p>}

          <p className={styles.register_or_login}>or</p>

          <Link to="/auth/register" className={styles.link_go_register}>
            Registrarte
          </Link>
        </div>
      </div>
    </div>
  );
};
