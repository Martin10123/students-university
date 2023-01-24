import { MessageError } from "../../helpers";

import styles from "../register.module.css";

export const PasswordBirthdayGender = ({
  birthday,
  formSubmitted,
  formValidation,
  gender,
  onInputChange,
  password1,
  password2,
}) => {
  const { birthdayValid, genderValid, password2Valid, password1Valid } =
    formValidation;

  return (
    <>
      <div className={styles.content_two_input}>
        <span>
          <input
            className={styles.form_input}
            type="password"
            placeholder="Contraseña..."
            name="password1"
            value={password1}
            onChange={onInputChange}
          />

          <MessageError
            textError={password1Valid || ""}
            errorActive={!!password1Valid && formSubmitted}
          />
        </span>

        <span>
          <input
            className={styles.form_input}
            type="password"
            placeholder="Confirmar contraseña..."
            name="password2"
            value={password2}
            onChange={onInputChange}
          />

          <MessageError
            textError={password2Valid || ""}
            errorActive={!!password2Valid && formSubmitted}
          />
        </span>
      </div>

      <input
        className={styles.form_input}
        type="date"
        name="birthday"
        value={birthday}
        onChange={onInputChange}
      />

      <MessageError
        textError={birthdayValid || ""}
        errorActive={!!birthdayValid && formSubmitted}
      />

      <select
        className={styles.form_select}
        name="gender"
        value={gender}
        onChange={onInputChange}
      >
        <option value="Hombre">Hombre</option>
        <option value="Mujer">Mujer</option>
      </select>

      <MessageError
        textError={genderValid || ""}
        errorActive={!!genderValid && formSubmitted}
      />
    </>
  );
};
