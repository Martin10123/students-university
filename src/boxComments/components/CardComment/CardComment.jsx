import { useEffect, useState } from "react";
import { photoUser } from "../../../assets";
import { getTimeAgo, shortName } from "../../../helpers";
import { filtrarComentarios } from "../../helper/commentValid";
import { ButtonsCard } from "../ButtonsCard/ButtonsCard";

import styles from "./cardComment.module.css";

export const CardComment = ({
  comment,
  uidUserOnline,
  userFoundByUsername,
  users,
}) => {
  const { opinion, createComment, uidUserActive } = comment;

  const userWriteComment = users?.find((user) => user.uid === uidUserActive);
  const isSameUser = uidUserActive === uidUserOnline;

  return (
    <div className={styles.info_comment}>
      <div className={styles.content_image_name}>
        <img
          className={styles.comment_img_user}
          src={
            userWriteComment?.photoUrl ? userWriteComment?.photoUrl : photoUser
          }
          alt="Foto de perfil"
        />
        <div className={styles.content_name_date}>
          <p>{shortName(userWriteComment?.displayName)}</p>
          <p>{getTimeAgo(createComment, "es")}</p>
        </div>
      </div>

      <div className={styles.content_message}>
        <p>{filtrarComentarios(opinion)}</p>
      </div>

      <ButtonsCard
        comment={comment}
        isSameUser={isSameUser}
        uidUserOnline={uidUserOnline}
        userFoundByUsername={userFoundByUsername}
      />
    </div>
  );
};
