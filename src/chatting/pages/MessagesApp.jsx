import { useState } from "react";
import { ChatsApp, ChatMessage } from "..";
import { useScroll } from "../../hook";

import styles from "../ChatsMessage/chatMessage.module.css";

export const MessagesApp = () => {
  const [openChatMessage, setopenChatMessage] = useState(false);

  useScroll([openChatMessage]);

  return (
    <div className={styles.desk_chat_container}>
      <div className={styles.desk_chat_content}>
        <ChatsApp />

        {openChatMessage ? (
          <ChatMessage
            openChatMessage={openChatMessage}
            setopenChatMessage={setopenChatMessage}
          />
        ) : (
          <div className={styles.show_message_not_selected}>
            <p>Selecciona un chat</p>
          </div>
        )}
      </div>
    </div>
  );
};
