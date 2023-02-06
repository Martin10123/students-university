import { useState } from "react";
import { OptionsMessage } from "./OptionsMessage";
import { CardMessage } from "./CardMessage";

import styles from "./chatMessage.module.css";

export const ContentMessages = ({
  combinedUid,
  findUserSelected,
  infoUserActive,
  messages,
}) => {
  const [openOptionsMessage, setOpenOptionsMessage] = useState(false);
  const [messageSelected, setMessageSelected] = useState(null);

  const onOpenOptions = (message) => {
    setMessageSelected(message);
    setOpenOptionsMessage(true);
  };

  return (
    <>
      <div className={styles.messages_users}>
        {messages.map((message) => (
          <CardMessage
            key={message.idDoc}
            combinedUid={combinedUid}
            findUserSelected={findUserSelected}
            infoUserActive={infoUserActive}
            message={message}
            onOpenOptions={onOpenOptions}
          />
        ))}
      </div>

      {openOptionsMessage && (
        <OptionsMessage
          combinedUid={combinedUid}
          messageSelected={messageSelected}
          setOpenOptionsMessage={setOpenOptionsMessage}
          infoUserActive={infoUserActive}
        />
      )}
    </>
  );
};
