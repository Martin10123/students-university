import { photoUser } from "../../assets";
import { getTimeAgo, shortName } from "../../helpers";

import styles from "./chatsApp.module.css";

export const CardChatFilter = ({
  setUidChatSelected,
  chat,
  getUsersFilter,
}) => {
  const { displayName, uid, photoUrl, activeAgo, isActive } = chat;

  return (
    <div
      className={styles.chat_message}
      onClick={() => setUidChatSelected(uid)}
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
        {getUsersFilter.map((chatUser) => {
          const lastMessage =
            chatUser[1]?.lastMessage.length >= 24
              ? chatUser[1]?.lastMessage?.substring(0, 24) + "..."
              : chatUser[1]?.lastMessage;

          return (
            chatUser[1]?.uid === uid && <p key={chatUser[0]}>{lastMessage}</p>
          );
        })}
      </div>
    </div>
  );
};
