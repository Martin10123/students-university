import { useForm } from "../../../../hook";

import styles from "./sentChatModal.module.css";

export const SentChatModal = ({ setOpenSendMessage }) => {
  const { message, onInputChange } = useForm({ message: "" });

  const onSendMessage = () => {
    console.log({ message });
  };

  return (
    <div className={styles.send_message_container}>
      <div
        className={styles.send_message_close_modal}
        onClick={() => setOpenSendMessage(false)}
      ></div>

      <div className={styles.send_message_content}>
        <h2>Enviar mensaje a {"displayName"}</h2>

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
            onClick={onSendMessage}
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};
