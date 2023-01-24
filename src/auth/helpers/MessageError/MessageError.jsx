import PropTypes from "prop-types";

import { MdError } from "react-icons/md";

import styles from "./stylesHelpers.module.css";

export const MessageError = ({ textError, errorActive }) => {
  return (
    errorActive && (
      <div className={styles.errorMessage}>
        <MdError />
        <p> {textError} </p>
      </div>
    )
  );
};

MessageError.propTypes = {
  errorActive: PropTypes.bool.isRequired,
  textError: PropTypes.string.isRequired,
};
