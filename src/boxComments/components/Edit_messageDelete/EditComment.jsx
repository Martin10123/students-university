// import { arrayUnion, doc, updateDoc } from "firebase/firestore";
// import { firebaseDB } from "../../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { firebaseDB } from "../../../firebase";
import { useForm } from "../../../hook";
import styles from "./styles.module.css";

export const EditComment = ({
  comment,
  setOpenEditComment,
  userFoundByUsername,
}) => {
  const { opinion, onInputChange } = useForm({
    opinion: comment.opinion,
  });

  const onUpdateComment = async () => {
    try {
      const docRef = doc(
        firebaseDB,
        `comments/${userFoundByUsername?.uid}/journal/${comment?.idDoc}`
      );

      await updateDoc(docRef, {
        opinion,
      });

      setOpenEditComment(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <textarea
          className={styles.form_textarea}
          name="opinion"
          value={opinion}
          onChange={onInputChange}
        />
        <div className={styles.buttons}>
          <button onClick={onUpdateComment}>Actualizar</button>
          <button onClick={() => setOpenEditComment(false)}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};
