import { deleteDoc, doc } from "firebase/firestore";
import { firebaseDB } from "../../../firebase";

import styles from "./styles.module.css";

export const SureDelete = ({
  comment,
  setOpenSureDelete,
  userFoundByUsername,
}) => {
  const onDeleteComment = async () => {
    try {
      const docRef = doc(
        firebaseDB,
        `comments/${userFoundByUsername?.uid}/journal/${comment?.idDoc}`
      );

      await deleteDoc(docRef);

      setOpenSureDelete(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2>Seguro que quieres borrarlo?</h2>
        <div className={styles.buttons}>
          <button onClick={onDeleteComment}>Borrar</button>
          <button onClick={() => setOpenSureDelete(false)}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};
