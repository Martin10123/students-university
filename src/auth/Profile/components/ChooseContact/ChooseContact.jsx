import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsWhatsapp } from "react-icons/bs";
import { MdAlternateEmail } from "react-icons/md";
import { RiMessengerLine } from "react-icons/ri";
import { SentChatModal } from "../SentChatModal/SentChatModal";

import styles from "./chooseContact.module.css";

export const ChooseContact = ({
  setOpenContact,
  userSelected,
  infoUserActive,
}) => {
  const [openSendMessage, setOpenSendMessage] = useState(false);

  return (
    <div className={styles.container_form_contact}>
      <div className={styles.content}>
        <h2>Formas de contactar</h2>

        <hr />
        <a
          className={styles.form_contact_whatsapp}
          href={`https://api.whatsapp.com/send?phone=${userSelected?.phoneNumber}&text=Hola%20mucho%20gusto`}
          target="_blank"
        >
          <BsWhatsapp />
          <p>Por Whatspp</p>
        </a>
        <div
          className={styles.form_contact_messenger}
          onClick={() => setOpenSendMessage(true)}
        >
          <RiMessengerLine />

          <p>Por nuestro chat</p>
        </div>
        <a
          className={styles.form_contact_email}
          href="https://mail.google.com/mail/u/0/#inbox"
          target="_blank"
        >
          <MdAlternateEmail />

          <p>Por Gmail</p>
        </a>

        <div
          className={styles.form_contact_close}
          onClick={() => setOpenContact(false)}
        >
          <AiOutlineClose />

          <p>Cerrar</p>
        </div>
      </div>

      {openSendMessage && (
        <SentChatModal
          setOpenSendMessage={setOpenSendMessage}
          userSelected={userSelected}
          infoUserActive={infoUserActive}
        />
      )}
    </div>
  );
};
