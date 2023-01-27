import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { shortName } from "../../helpers";
import { useForm } from "../../hook";
import { onSendingMessage } from "../helpers";

import styles from "./sentChatModal.module.css";

export const SentChatModal = ({
  infoUserActive,
  setOpenSendMessage,
  userSelected,
}) => {
  const [startLoading, setStartLoading] = useState(false);
  const nameUserActiveReduce = shortName(infoUserActive?.displayName);
  const nameReduce = shortName(userSelected?.displayName);
  const combinedUid =
    infoUserActive.uid > userSelected.uid
      ? infoUserActive.uid + userSelected.uid
      : userSelected.uid + infoUserActive.uid;

  const navigate = useNavigate();

  const { message, onInputChange } = useForm({
    message: `Hola soy ${nameUserActiveReduce}, ${nameReduce} me gustaria adquirir tus servicios, estas disponible?`,
  });

  const onSendMessage = async () => {
    setStartLoading(true);

    await onSendingMessage({
      combinedUid,
      infoUserActive,
      message,
      navigate,
      userSelected,
    });

    setStartLoading(false);
  };

  return (
    <div className={styles.send_message_container}>
      <div
        className={styles.send_message_close_modal}
        onClick={() => setOpenSendMessage(false)}
      ></div>

      <div className={styles.send_message_content}>
        <h2>Enviar mensaje a {nameReduce}</h2>

        <div className={styles.send_message_form}>
          <textarea
            className={styles.send_message_form_input}
            name="message"
            placeholder="Enviar mensaje..."
            value={message}
            onChange={onInputChange}
          />

          <button
            className={styles.send_message_form_button}
            disabled={startLoading}
            onClick={onSendMessage}
            style={{ background: startLoading ? "#00ff00" : "#0099ff" }}
          >
            {startLoading ? "Enviando..." : "Enviar"}
          </button>
        </div>
      </div>
    </div>
  );
};
