import { photoUser } from "../../assets";
import { shortName } from "../../helpers";

import styles from "./chatsApp.module.css";

export const CardChatFilter = ({ chat }) => {
  const {
    lastMessage: { lastMessage },
    userInfo: { photoUrl, displayName },
  } = chat;

  return (
    <div className={styles.chat_message}>
      <figure className={styles.img_user_message}>
        <img
          src={photoUrl ? photoUrl : photoUser}
          alt={`Foto de perfil de ${shortName(displayName)}`}
        />
      </figure>

      <div className={styles.name_user}>
        <p>{shortName(displayName)}</p>
        <p>{lastMessage?.substring(0, 24) + "..."}</p>
      </div>
    </div>
  );
};
