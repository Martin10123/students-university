import { photoUser } from "../../../assets";
import { ButtonsCard } from "../ButtonsCard/ButtonsCard";

import styles from "./cardComment.module.css";

export const CardComment = () => {
  return (
    <div className={styles.info_comment}>
      <div className={styles.content_image_name}>
        <img
          className={styles.comment_img_user}
          src={photoUser}
          alt="Foto de perfil"
        />
        <div className={styles.content_name_date}>
          <p>{"userSelect?.displayName"}</p>
          <p>{"createComment"}</p>
        </div>
      </div>

      <div className={styles.content_message}>
        <p>{"opinion"}</p>
      </div>

      <ButtonsCard />
    </div>
  );
};
