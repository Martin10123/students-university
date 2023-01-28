import { useEffect, useRef, useState } from "react";
import { IoIosArrowDropdown } from "react-icons/io";
import { photoUser } from "../../assets";
import { getTimeAgo } from "../../helpers";
import { OptionsMessage } from "./OptionsMessage";

import styles from "./chatMessage.module.css";

export const ContentMessages = ({
  combinedUid,
  infoUserActive,
  messages,
  photoUrl,
}) => {
  const [openOptionsMessage, setOpenOptionsMessage] = useState(false);
  const [messageSelected, setMessageSelected] = useState(null);
  const ref = useRef();

  const onOpenOptions = (message) => {
    setMessageSelected(message);
    setOpenOptionsMessage(true);
  };

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className={styles.messages_users}>
        {messages.map((message) => (
          <div
            key={message.idDoc}
            ref={ref}
            className={
              message.uid !== infoUserActive?.uid
                ? styles.message_left
                : styles.message_right
            }
          >
            <div className={styles.message_img_hour}>
              <figure
                className={styles.content_img_user_chat}
                onClick={() => onOpenOptions(message)}
              >
                <img
                  className={styles.img_inside_message}
                  src={photoUrl ? photoUrl : photoUser}
                  alt="Foto de martin"
                />
                <IoIosArrowDropdown className={styles.icon_message} />
              </figure>
              <p>{getTimeAgo(message.createMessage)}</p>
            </div>
            <p className={styles.message_text}>{message.message}</p>
          </div>
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
