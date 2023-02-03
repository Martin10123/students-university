import { MessageError } from "../../../../auth/helpers";

import styles from "./inputForm.module.css";

export const InputForm = ({
  array,
  errorActive,
  Icon,
  infoSelectValues,
  name,
  onChange,
  onClick,
  onSelectEmails,
  onSelectValues,
  openButton,
  placeholder,
  setarray,
  textError,
  type,
  typeOpenButton = false,
  value,
}) => {
  return (
    <div className={styles.content_all_info_input}>
      <div className={styles.content_form_input}>
        <Icon />
        <input
          className={styles.input_form}
          name={name}
          onChange={onChange}
          onClick={onClick}
          placeholder={placeholder}
          type={type}
          value={value}
        />

        {!!openButton && !typeOpenButton && (
          <button onClick={() => onSelectEmails(openButton)}>Add</button>
        )}

        {!!openButton && typeOpenButton && (
          <button
            onClick={() =>
              onSelectValues(array, setarray, openButton, infoSelectValues)
            }
          >
            Add
          </button>
        )}
      </div>

      <MessageError errorActive={errorActive} textError={textError} />
    </div>
  );
};
