import { useState } from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import { photoUser } from "../../assets";
import { getTimeAgo, shortName } from "../../helpers";
import { useCloseModalOutside } from "../../hook";

import styles from "./chatsApp.module.css";

export const CardChatFilter = ({
  chat,
  chatsFilters,
  onOpenChat,
  onDeleteChatUser,
}) => {
  const [openEllipsis, setOpenEllipsis] = useState(false);
  const { activeAgo, displayName, isActive, photoUrl, uid, username } = chat;
  const { chats } = chatsFilters;

  const ref = useCloseModalOutside(() => setOpenEllipsis(false));

  return (
    <div className={styles.chat_message}>
      <figure
        className={styles.img_user_message}
        onClick={() => onOpenChat({ uid, username })}
      >
        <img
          src={photoUrl ? photoUrl : photoUser}
          alt={`Foto de perfil de Martin`}
        />
        <p>{isActive ? "En linea" : getTimeAgo(activeAgo)}</p>
      </figure>

      <div
        className={styles.name_user}
        onClick={() => onOpenChat({ uid, username })}
      >
        <p>{shortName(displayName)}</p>
        {Object.entries(chats).map(([idDoc, chatUser]) => {
          const {
            lastMessage: message,
            isView,
            whoWritteMessage,
            uid: uidChatting,
          } = chatUser;

          const lastMessage =
            message.length >= 24 ? message?.substring(0, 24) + "..." : message;

          const isViewOrNot = { fontWeight: isView ? "300" : "bold" };

          const whoIs = whoWritteMessage === uid ? "Otro: " : "Tú: ";

          return (
            uidChatting === uid && (
              <p style={isViewOrNot} key={idDoc}>
                {whoIs} {lastMessage}
              </p>
            )
          );
        })}
      </div>

      <HiEllipsisVertical
        className={styles.ellipsis_vertical}
        onClick={() => setOpenEllipsis(true)}
      />

      {openEllipsis && (
        <div ref={ref} className={styles.options_container}>
          <p
            className={styles.option_ellipsis}
            onClick={() => onDeleteChatUser({ username })}
          >
            Eliminar chat
          </p>
        </div>
      )}
    </div>
  );
};
