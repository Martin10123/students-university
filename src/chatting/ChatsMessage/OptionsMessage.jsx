import { arrayUnion, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { AiFillDelete, AiOutlineCopy } from "react-icons/ai";
import { HiUserCircle } from "react-icons/hi";
import { TiDelete } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { firebaseDB } from "../../firebase";

import styles from "./chatMessage.module.css";

export const OptionsMessage = ({
  combinedUid,
  messageSelected,
  setOpenOptionsMessage,
  infoUserActive,
}) => {
  const [copy, setCopy] = useState("");
  const navigate = useNavigate();

  const { username, message, idDoc, uid, deleteForMy } = messageSelected;

  const onCopyText = async () => {
    try {
      await navigator.clipboard.writeText(message);

      setCopy("Se copio el texto");
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteMessage = async (type) => {
    const pathRef = `messages/${combinedUid}/entry/${idDoc}`;

    try {
      if (type === "delete") {
        await deleteDoc(doc(firebaseDB, pathRef));
      } else {
        await updateDoc(doc(firebaseDB, pathRef), {
          deleteForMy: arrayUnion(infoUserActive.uid),
        });
      }

      if (deleteForMy.length === 1) {
        await deleteDoc(doc(firebaseDB, pathRef));
      }

      setOpenOptionsMessage(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container_options}>
      <div
        className={styles.background_close}
        onClick={() => setOpenOptionsMessage(false)}
      ></div>
      <div className={styles.content_options}>
        <p className={styles.item} onClick={() => navigate(`/${username}`)}>
          <HiUserCircle />
          Ver perfil
        </p>
        <p className={styles.item} onClick={onCopyText}>
          <AiOutlineCopy />
          {copy ? copy : "Copiar"}
        </p>
        <p className={styles.item} onClick={() => onDeleteMessage("forMy")}>
          <TiDelete />
          Borrar mensaje para mi
        </p>
        {infoUserActive.uid === uid && (
          <p className={styles.item} onClick={() => onDeleteMessage("delete")}>
            <AiFillDelete />
            Anular envio
          </p>
        )}
      </div>
    </div>
  );
};
