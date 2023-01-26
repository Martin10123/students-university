import { useContext, useState } from "react";
import { ChatsApp, ChatMessage } from "..";
import { AuthUserContext } from "../../context";
import { useScroll } from "../../hook";

import styles from "../ChatsMessage/chatMessage.module.css";

export const MessagesApp = () => {
  const [openChatMessage, setopenChatMessage] = useState(false);
  const { infoUserActive } = useContext(AuthUserContext);

  useScroll([openChatMessage]);

  return (
    <div className={styles.desk_chat_container}>
      <div className={styles.desk_chat_content}>
        <ChatsApp
          setopenChatMessage={setopenChatMessage}
          infoUserActive={infoUserActive}
        />

        {openChatMessage ? (
          <ChatMessage
            openChatMessage={openChatMessage}
            setopenChatMessage={setopenChatMessage}
            infoUserActive={infoUserActive}
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
