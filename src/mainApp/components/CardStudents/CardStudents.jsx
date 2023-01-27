import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FiMessageSquare } from "react-icons/fi";
import { Link } from "react-router-dom";
import { photoUser } from "../../../assets";
import { SentChatModal } from "../../../chatting";
import { useScroll } from "../../../hook";

import styles from "./cardStudents.module.css";

export const CardStudents = ({ user, infoUserActive }) => {
  const {
    displayName,
    phoneNumber,
    photoUrl,
    semester,
    subject,
    subjectSelectGood,
    username,
    votesGood,
    votesBad,
  } = user;

  const [openSendMessage, setOpenSendMessage] = useState(false);

  useScroll([openSendMessage]);

  return (
    <>
      <div className={styles.card_info}>
        <figure className={styles.image_prof}>
          <img
            src={photoUrl ? photoUrl : photoUser}
            alt="Foto del profesional"
          />
        </figure>
        <div className={styles.content_all_info}>
          <div className={styles.name_profession}>
            <p>{displayName}</p>
            <p>{subject}</p>
          </div>
          <div className={styles.appoi_select_subject}>
            {subjectSelectGood.map((subjectSelected) => (
              <p key={subjectSelected}>{subjectSelected}</p>
            ))}
          </div>
          <div className={styles.container_select_appoi}>
            <div className={styles.appoi_select}>
              <p>{phoneNumber}</p>
            </div>
            <div className={styles.appoi_select}>
              <p>{semester} semestre</p>
            </div>
            <div className={styles.appoi_select}>
              <p>Votos buenos: {votesGood.length}</p>
            </div>
            <div className={styles.appoi_select}>
              <p>Votos malos: {votesBad.length}</p>
            </div>
          </div>

          <div className={styles.container_buttons}>
            <Link to={`/${username}`}>
              <CgProfile />
              Ver perfil
            </Link>
            <button onClick={() => setOpenSendMessage(true)}>
              <FiMessageSquare />
              Chatear
            </button>
          </div>
        </div>
      </div>
      {openSendMessage && (
        <SentChatModal
          setOpenSendMessage={setOpenSendMessage}
          userSelected={user}
          infoUserActive={infoUserActive}
        />
      )}
    </>
  );
};
