import { useForm } from "../../../hook";
import styles from "./styles.module.css";

export const EditComment = ({ setOpenEditComment }) => {
  const { opinion, onInputChange } = useForm({
    opinion: "",
  });

  const onUpdateComment = () => {
    console.log("Updating...");
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
