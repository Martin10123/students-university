import { useEffect, useMemo, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import { useForm } from "../../hook";
import { CardChatFilter } from "./CardChatFilter";
import { shortName } from "../../helpers";
import { firebaseDB } from "../../firebase";
import {
  deleteField,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getUserByChat } from "../helpers/getUsersByChat";

import styles from "./chatsApp.module.css";

export const ChatsApp = ({
  infoUserActive,
  setUidChatSelected,
  setopenChatMessage,
  users,
}) => {
  const [chatsFilters, setChatsFilters] = useState([]);

  const navigate = useNavigate();
  const { searchChat, onInputChange } = useForm({
    searchChat: "",
  });

  useEffect(() => {
    if (!infoUserActive) return;

    const docRef = doc(firebaseDB, "usersChats", infoUserActive?.uid);

    const unSuscribed = onSnapshot(docRef, (chat) => {
      setChatsFilters({ idDoc: chat.id, chats: chat.data() });
    });

    return () => unSuscribed();
  }, [infoUserActive?.uid]);

  const getUsers = users?.filter((user) =>
    Object.entries(chatsFilters.chats || [])?.find(
      (chat) => user.uid === chat[1].uid
    )
  );

  const chatsFilterMap = useMemo(
    () => getUserByChat(getUsers, searchChat),
    [getUsers, searchChat]
  );

  const onOpenChat = async ({ username, uid }) => {
    try {
      setUidChatSelected(uid);
      setopenChatMessage(true);

      await setDoc(
        doc(firebaseDB, "usersChats", infoUserActive?.uid),
        { [username]: { isView: true } },
        { merge: true }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteChatUser = async ({ username }) => {
    try {
      await updateDoc(
        doc(firebaseDB, "usersChats", infoUserActive?.uid),
        { [username]: deleteField() },
        { merge: true }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className={styles.container_chat}>
      <div className={styles.return_nav}>
        <BsArrowLeft onClick={() => navigate("/")} />
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

          <div className={styles.content_chats_to_message}>
            {chatsFilterMap.map((chat) => (
              <CardChatFilter
                key={chat.idDoc}
                chat={chat}
                chatsFilters={chatsFilters}
                onOpenChat={onOpenChat}
                onDeleteChatUser={onDeleteChatUser}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
