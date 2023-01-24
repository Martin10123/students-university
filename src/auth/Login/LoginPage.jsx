import { useState } from "react";

import { AiOutlineMail } from "react-icons/ai";
import { BsArrowLeft } from "react-icons/bs";
import { CiLogin } from "react-icons/ci";
import { Link } from "react-router-dom";
import { RiLockPasswordLine } from "react-icons/ri";

import { MessageError, ValidatorFormLogin } from "../helpers";
import { useForm } from "../../hook";

import styles from "./login.module.css";

const formLogin = {
  email: "",
  password: "",
};

export const LoginPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const {
    email,
    emailValid,
    isFormValid,
    onInputChange,
    password,
    passwordValid,
  } = useForm(formLogin, ValidatorFormLogin);

  const onSubmitForm = () => {
    if (!isFormValid) return setFormSubmitted(true);

    console.log({ email, password });
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

        <form className={styles.form}>
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
          <button className={styles.button} onClick={onSubmitForm}>
            <CiLogin />
            Ingresar
          </button>

          {false && <p className={styles.show_error}>{"errorMessage"}</p>}

          <p className={styles.register_or_login}>or</p>

          <Link to="/auth/register" className={styles.link_go_register}>
            Registrarte
          </Link>
        </div>
      </div>
    </div>
  );
};
