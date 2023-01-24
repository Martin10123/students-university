import { MessageError } from "../../helpers";
import styles from "../register.module.css";

export const NameNumberEmail = ({
  displayName,
  email,
  formSubmitted,
  formValidation,
  onInputChange,
  phoneNumber,
}) => {
  const { displayNameValid, phoneNumberValid, emailValid } = formValidation;

  return (
    <>
      <div className={styles.content_two_input}>
        <span>
          <input
            className={styles.form_input}
            type="text"
            placeholder="Nombre completo..."
            name="displayName"
            value={displayName}
            onChange={onInputChange}
          />

          <MessageError
            errorActive={!!displayNameValid && formSubmitted}
            textError={displayNameValid || ""}
          />
        </span>

        <span>
          <input
            className={styles.form_input}
            type="number"
            placeholder="Número..."
            name="phoneNumber"
            value={phoneNumber}
            onChange={onInputChange}
          />

          <MessageError
            errorActive={!!phoneNumberValid && formSubmitted}
            textError={phoneNumberValid || ""}
          />
        </span>
      </div>

      <input
        className={styles.form_input}
        type="email"
        placeholder="Email..."
        name="email"
        value={email}
        onChange={onInputChange}
      />

      <MessageError
        errorActive={!!emailValid && formSubmitted}
        textError={emailValid || ""}
      />
    </>
  );
};
