import { BiSearchAlt } from "react-icons/bi";
import { useCloseModalOutside } from "../../../../hook";

import styles from "../pages/offersLayout.module.css";

export const AutoComplete = ({
  arrayDataGlobal = [],
  closeModal,
  onSelectValues,
  arrayWithData,
  setArrayWithData,
  whatIs,
}) => {
  const ref = useCloseModalOutside(closeModal);

  return (
    <div ref={ref} className={styles.content_autocomplete}>
      <ul className={styles.autocomplete_form}>
        {arrayDataGlobal.map((value) => (
          <li
            key={value}
            onClick={() =>
              onSelectValues(arrayWithData, setArrayWithData, value, whatIs)
            }
            style={{
              color: arrayWithData.includes(value) ? "#0099ff" : "#000",
            }}
          >
            <BiSearchAlt /> {value}
          </li>
        ))}
      </ul>
    </div>
  );
};
