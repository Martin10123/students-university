import { doc, setDoc } from "firebase/firestore";
import { useEffect, useRef } from "react";
import { IoIosArrowDropdown } from "react-icons/io";
import { photoUser } from "../../assets";
import { firebaseDB } from "../../firebase";
import { getTimeAgo } from "../../helpers";

import styles from "./chatMessage.module.css";

export const CardMessage = ({
  combinedUid,
  findUserSelected,
  infoUserActive,
  message,
  onOpenOptions,
}) => {
  const ref = useRef();

  useEffect(() => {
    const onIsView = async () => {
      await setDoc(
        doc(firebaseDB, `messages/${combinedUid}/entry/${message.idDoc}`),
        { isView: true },
        { merge: true }
      );

      const usernameIs =
        infoUserActive.uid === message.uid
          ? message.usernameOtherUser
          : message.username;

      await setDoc(
        doc(firebaseDB, "usersChats", infoUserActive?.uid),
        { [usernameIs]: { isView: true } },
        { merge: true }
      );
    };

    onIsView();

    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const thereMessage = !message.deleteForMy.includes(infoUserActive?.uid)
    ? message.message
    : "Eliminaste este mensaje";

  const photoUrl =
    infoUserActive.uid === message.uid
      ? infoUserActive.photoUrl
      : findUserSelected.photoUrl;

  return (
    <div
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
      <p className={styles.message_text}>{thereMessage}</p>
    </div>
  );
};
