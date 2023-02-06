import { photoUser } from "../../assets";
import { getTimeAgo, shortName } from "../../helpers";

import styles from "./chatsApp.module.css";

export const CardChatFilter = ({ chat, chatsFilters, onOpenChat }) => {
  const { activeAgo, displayName, isActive, photoUrl, uid, username } = chat;
  const { chats } = chatsFilters;

  return (
    <div
      className={styles.chat_message}
      onClick={() => onOpenChat({ uid, username })}
    >
      <figure className={styles.img_user_message}>
        <img
          src={photoUrl ? photoUrl : photoUser}
          alt={`Foto de perfil de Martin`}
        />
        <p>{isActive ? "En linea" : getTimeAgo(activeAgo)}</p>
      </figure>

      <div className={styles.name_user}>
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
    </div>
  );
};
