import { useState } from "react";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { firebaseDB } from "../../../../firebase";
import { shortName } from "../../../../helpers";
import { useForm } from "../../../../hook";

import styles from "./sentChatModal.module.css";

export const SentChatModal = ({
  infoUserActive,
  setOpenSendMessage,
  userSelected,
}) => {
  const [startLoading, setStartLoading] = useState(false);
  const nameUserActiveReduce = shortName(infoUserActive?.displayName);
  const nameReduce = shortName(userSelected?.displayName);
  const combinedUid = infoUserActive?.uid + userSelected?.uid;
  const navigate = useNavigate();

  const { message, onInputChange } = useForm({
    message: `Hola soy ${nameUserActiveReduce}, ${nameReduce} me gustaria adquirir tus servicios, estas disponible?`,
  });

  const dataSendMessage = async (data, dataDocRef, onlyMessage) => {
    if (onlyMessage) {
      await updateDoc(doc(firebaseDB, "usersChats", data?.uid), {
        [combinedUid + ".lastMessage"]: {
          lastMessage: message,
        },
        [combinedUid + ".createMessage"]: serverTimestamp(),
      });
    } else {
      await updateDoc(doc(firebaseDB, "usersChats", dataDocRef?.uid), {
        [combinedUid + ".userInfo"]: {
          displayName: data?.displayName,
          photoUrl: data?.photoUrl,
          username: data?.username,
          uid: data?.uid,
        },
        [combinedUid + ".lastMessage"]: {
          lastMessage: message,
        },
        [combinedUid + ".createMessage"]: serverTimestamp(),
      });
    }
  };

  const onSendMessage = async () => {
    setStartLoading(true);

    try {
      const docRef = collection(firebaseDB, `messages/${combinedUid}/entry`);

      await addDoc(docRef, {
        createComment: new Date().getTime(),
        message,
        uidUserActive: infoUserActive?.uid,
        username: infoUserActive?.username,
        deleteForMy: [],
        isView: false,
      });

      const res = await getDocs(
        collection(firebaseDB, `messages/${combinedUid}/entry`)
      );

      if (res.size === 1) {
        await dataSendMessage(infoUserActive, userSelected);

        await dataSendMessage(userSelected, infoUserActive);
      }

      if (res.size > 1) {
        await dataSendMessage(infoUserActive, infoUserActive, true);

        await dataSendMessage(userSelected, userSelected, true);
      }

      setStartLoading(false);

      navigate("/chat");
    } catch (error) {
      console.log(error);
      setStartLoading(false);
    }
  };

  return (
    <div className={styles.send_message_container}>
      <div
        className={styles.send_message_close_modal}
        onClick={() => setOpenSendMessage(false)}
      ></div>

      <div className={styles.send_message_content}>
        <h2>Enviar mensaje a {nameReduce}</h2>

        <div className={styles.send_message_form}>
          <textarea
            className={styles.send_message_form_input}
            name="message"
            placeholder="Enviar mensaje..."
            value={message}
            onChange={onInputChange}
          />

          <button
            className={styles.send_message_form_button}
            disabled={startLoading}
            onClick={onSendMessage}
            style={{ background: startLoading ? "#00ff00" : "#0099ff" }}
          >
            {startLoading ? "Enviando..." : "Enviar"}
          </button>
        </div>
      </div>
    </div>
  );
};
