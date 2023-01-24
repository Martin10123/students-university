import { photoUser } from "../../assets";
import { shortName } from "../../helpers";

import styles from "./chatsApp.module.css";

export const CardChatFilter = () => {
  return (
    <div className={styles.chat_message}>
      <figure className={styles.img_user_message}>
        <img src={photoUser} alt="Foto de perfil" />
      </figure>

      <div className={styles.name_user}>
        <p>{shortName("displayName")}</p>
      </div>
    </div>
  );
};
