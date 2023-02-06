import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { BsArrowLeft, BsCameraVideo, BsTelephone } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { photoUser } from "../../assets";
import { firebaseDB } from "../../firebase";
import { getTimeAgo, shortName } from "../../helpers";
import { useForm } from "../../hook";
import { onSendingMessage } from "../helpers";
import { ContentMessages } from "./ContentMessages";
import { InputSendMessage } from "./InputSendMessage";

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
  const { displayName, photoUrl, username, activeAgo, isActive } =
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

            <div className={styles.name_user}>
              <p>{shortName(displayName)}</p>
              <p>{isActive ? "En linea" : `Hace ${getTimeAgo(activeAgo)}`}</p>
            </div>
          </div>

          <div className={styles.content_mobile}>
            <BsTelephone />
            <BsCameraVideo />
          </div>
        </div>

        <ContentMessages
          infoUserActive={infoUserActive}
          messages={messages}
          findUserSelected={findUserSelected}
          combinedUid={combinedUid}
        />

        <InputSendMessage
          message={message}
          onInputChange={onInputChange}
          onSubmitMessage={onSubmitMessage}
        />
      </div>
    </div>
  );
};
