import PropTypes from "prop-types";

import styles from "./filterOptions.module.css";

export const FilterOptions = ({
  choosedBefore = [],
  data = [],
  onSelectData,
  setOpenFilter,
}) => {
  return (
    <div className={styles.container}>
      <div
        className={styles.background_close}
        onClick={() => setOpenFilter(false)}
      ></div>
      <div className={styles.content}>
        {data.map((subject) => {
          const markThis = choosedBefore.includes(subject);

          return (
            <p
              className={markThis ? styles.markThis : ""}
              onClick={() => onSelectData(subject)}
              key={subject}
            >
              {subject}
            </p>
          );
        })}
      </div>
    </div>
  );
};

FilterOptions.propTypes = {
  data: PropTypes.array.isRequired,
  choosedBefore: PropTypes.array.isRequired,
  setOpenFilter: PropTypes.func.isRequired,
  onSelectData: PropTypes.func.isRequired,
};
