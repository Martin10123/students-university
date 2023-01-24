import { AiOutlineSend } from "react-icons/ai";
import { useParams } from "react-router-dom";

import { useForm } from "../../hook";
import { Navbar } from "../../ui/Navbar";
import { CardComment } from "../components";

import styles from "./boxComment.module.css";

const dataComment = {
  opinion: "",
};

export const BoxComment = () => {
  const { opinion, onInputChange, onResetForm } = useForm(dataComment);

  const { name } = useParams();

  const nameReduce = `${name?.split(" ")[0]} ${name?.split(" ")[1]}`;

  const onSubmitComment = () => {
    if (opinion.trim().length <= 0) return;

    console.log({ opinion });

    onResetForm();
  };

  return (
    <article className={styles.container}>
      <Navbar backColor="#fff" colorLetter="#000" />
      <div className={styles.content}>
        <h2>Opinar sobre {nameReduce}</h2>

        <div className={styles.form}>
          <textarea
            name="opinion"
            onChange={onInputChange}
            placeholder="Dar tu opinión..."
            value={opinion}
          />

          <button className={styles.button_send} onClick={onSubmitComment}>
            Enviar
            <AiOutlineSend />
          </button>
        </div>

        <span className={styles.title_opinion}>
          <h2>Opiniones sobre {nameReduce}</h2>
          <hr />
        </span>

        <div className={styles.container_card_comments}>
          <CardComment />
        </div>
      </div>
    </article>
  );
};
