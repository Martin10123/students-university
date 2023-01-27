import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  BsArrowLeft,
  BsCameraVideo,
  BsFillCameraFill,
  BsTelephone,
} from "react-icons/bs";
import { MdOutlineAddReaction } from "react-icons/md";
import { TbMicrophone } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { photoUser } from "../../assets";
import { firebaseDB } from "../../firebase";
import { getTimeAgo, shortName } from "../../helpers";
import { useForm } from "../../hook";
import { onSendingMessage } from "../helpers";

import styles from "./chatMessage.module.css";

export const ChatMessage = ({
  findUserSelected,
  infoUserActive,
  openChatMessage,
  setopenChatMessage,
}) => {
  const openChat = openChatMessage ? "" : styles.hidden_component;
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();
  const { message, onInputChange, onResetForm } = useForm({ message: "" });
  const { displayName, uid, photoUrl, username, activeAgo, isActive } =
    findUserSelected;
  const combinedUid =
    infoUserActive.uid > findUserSelected.uid
      ? infoUserActive.uid + findUserSelected.uid
      : findUserSelected.uid + infoUserActive.uid;

  useEffect(() => {
    const docRef = query(
      collection(firebaseDB, `messages/${combinedUid}/entry`),
      orderBy("createMessage", "asc")
    );

    const unSuscribed = onSnapshot(docRef, (messages) => {
      const arrayMessages = messages.docs.map((doc) => {
        return {
          idDoc: doc.id,
          ...doc.data(),
        };
      });
      setMessages(arrayMessages);
    });

    return () => unSuscribed();
  }, [combinedUid]);

  const onSubmitMessage = async (e) => {
    e.preventDefault();
    if (message.trim().length === 0) return;

    try {
      await onSendingMessage({
        combinedUid,
        infoUserActive,
        message,
        navigate,
        userSelected: findUserSelected,
      });

      onResetForm();
    } catch (error) {
      console.log(error);
    }
  };

  const goToProfile = () => {
    navigate(`/${username}`);
  };

  return (
    <div className={`${styles.container} ${openChat}`}>
      <div className={styles.content}>
        <div className={styles.nav_message}>
          <div className={styles.image_user}>
            <BsArrowLeft onClick={() => setopenChatMessage(false)} />

            <img
              alt="Foto de perfil"
              onClick={goToProfile}
              src={photoUrl ? photoUrl : photoUser}
            />

            <span className={styles.name_user}>
              <p>{shortName(displayName)}</p>
              <p>{isActive ? "En linea" : `Hace ${getTimeAgo(activeAgo)}`}</p>
            </span>
          </div>

          <div className={styles.content_mobile}>
            <BsTelephone />
            <BsCameraVideo />
          </div>
        </div>

        <div className={styles.messages_users}>
          {messages.map((message) => (
            <div
              key={message.idDoc}
              className={
                message.uid !== infoUserActive?.uid
                  ? styles.message_left
                  : styles.message_right
              }
            >
              <div className={styles.message_img_hour}>
                <img
                  className={styles.img_user_message}
                  src={photoUser}
                  alt="Foto de martin"
                />
                <p>{getTimeAgo(message.createMessage)}</p>
              </div>
              <p>{message.message}</p>
            </div>
          ))}
        </div>

        <div className={styles.form_input}>
          <form className={styles.input_div} onSubmit={onSubmitMessage}>
            <div className={styles.camera_send_photo}>
              <BsFillCameraFill className={styles.svg_input} />
            </div>
            <input
              type="text"
              placeholder="Enviar un mensaje..."
              className={styles.input_form_value}
              name="message"
              value={message}
              onChange={onInputChange}
            />

            <div className={styles.content_other_svg}>
              <TbMicrophone className={styles.svg_input} />
              <MdOutlineAddReaction className={styles.svg_input} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
