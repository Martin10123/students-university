import { useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import { useForm } from "../../hook";
import { CardChatFilter } from "./CardChatFilter";
import { shortName } from "../../helpers";
import { firebaseDB } from "../../firebase";
import { doc, onSnapshot } from "firebase/firestore";

import styles from "./chatsApp.module.css";

export const ChatsApp = ({ setopenChatMessage, infoUserActive }) => {
  const [chatsFilters, setChatsFilters] = useState([]);
  const navigate = useNavigate();
  const { searchChat, onInputChange } = useForm({
    searchChat: "",
  });

  useEffect(() => {
    if (!infoUserActive) return;

    const docRef = doc(firebaseDB, "usersChats", infoUserActive?.uid);

    const unSuscribed = onSnapshot(docRef, (chat) => {
      setChatsFilters(chat.data());
    });

    return () => unSuscribed();
  }, [infoUserActive?.uid]);

  return (
    <section className={styles.container_chat}>
      <div className={styles.return_nav}>
        <BsArrowLeft onClick={() => navigate(-1)} />
        <p>{shortName(infoUserActive?.displayName)}</p>
      </div>

      <div className={styles.content}>
        <div className={styles.form_input}>
          <BiSearchAlt />
          <input
            type="text"
            placeholder="Buscar..."
            className={styles.filter_input}
            name="searchChat"
            value={searchChat}
            onChange={onInputChange}
          />
        </div>

        <div className={styles.content_chats_active}>
          <p className={styles.title_message}>Mensajes</p>

          <div
            className={styles.content_chats_to_message}
            onClick={() => setopenChatMessage(true)}
          >
            {Object.entries(chatsFilters)
              .sort((a, b) => b[1].createMessage - a[1].createMessage)
              .map((chat) => (
                <CardChatFilter key={chat[0]} chat={chat[1]} />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};
