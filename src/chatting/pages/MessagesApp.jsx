import { useContext, useState } from "react";
import { ChatsApp, ChatMessage } from "..";
import { AuthUserContext } from "../../context";
import { useScroll } from "../../hook";

import styles from "../ChatsMessage/chatMessage.module.css";

export const MessagesApp = () => {
  const [openChatMessage, setopenChatMessage] = useState(false);
  const [uidChatSelected, setUidChatSelected] = useState({});
  const { infoUserActive, users } = useContext(AuthUserContext);

  const findUserSelected = users.find((user) => user?.uid === uidChatSelected);

  useScroll([openChatMessage]);

  return (
    <div className={styles.desk_chat_container}>
      <div className={styles.desk_chat_content}>
        <ChatsApp
          infoUserActive={infoUserActive}
          setUidChatSelected={setUidChatSelected}
          setopenChatMessage={setopenChatMessage}
          users={users}
        />

        {openChatMessage ? (
          <ChatMessage
            findUserSelected={findUserSelected}
            infoUserActive={infoUserActive}
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
