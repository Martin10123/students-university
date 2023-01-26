import { AiOutlineFieldNumber } from "react-icons/ai";
import { BiLabel, BiUserCircle } from "react-icons/bi";
import { BsPhone, BsCalendarDate } from "react-icons/bs";
import { MdAlternateEmail, MdOutlineCollectionsBookmark } from "react-icons/md";
import { RiCake2Line } from "react-icons/ri";
import { SlNotebook } from "react-icons/sl";
import { dateIsValid } from "../../../helpers";

import styles from "./listItem.module.css";

export const ListItem = ({
  birthday,
  createAccount,
  email,
  gender,
  phoneNumber,
  semester,
  subject,
  subjectSelectGood,
  username,
}) => {
  const userYearsOld = dateIsValid(birthday);

  return (
    <div className={styles.content_all_info_list}>
      <ul className={styles.list_item}>
        <li className={styles.item}>
          <BiLabel />
          {username}
        </li>
        <li className={styles.item}>
          <MdAlternateEmail />
          {email}
        </li>
        <li className={styles.item}>
          <BsPhone />
          {phoneNumber}
        </li>
        <li className={styles.item}>
          <RiCake2Line />
          {birthday} - ({userYearsOld} años)
        </li>
        <li className={styles.item}>
          <BiUserCircle />
          {gender}
        </li>
        <li className={styles.item}>
          <BsCalendarDate />
          Se unio {createAccount}
        </li>
        <li className={styles.item}>
          <SlNotebook />
          {subject}
        </li>
        <li className={styles.item}>
          <AiOutlineFieldNumber />
          {semester} semestre
        </li>
      </ul>

      {subjectSelectGood.length !== 0 && (
        <div className={styles.content_collegeCareer}>
          {subjectSelectGood.map((subjectSelect) => (
            <p key={subjectSelect}>
              <MdOutlineCollectionsBookmark /> {subjectSelect}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};
