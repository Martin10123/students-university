import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";

import { AiOutlineSend } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { AuthUserContext } from "../../context";
import { firebaseDB } from "../../firebase";
import { shortName } from "../../helpers";

import { useForm } from "../../hook";
import { Navbar } from "../../ui/Navbar";
import { CardComment } from "../components";

import styles from "./boxComment.module.css";

const dataComment = {
  opinion: "",
};

export const BoxComment = () => {
  const [comments, setComments] = useState([]);
  const { opinion, onInputChange, onResetForm } = useForm(dataComment);
  const { name, username } = useParams();
  const { users, searchUserByUsername, infoUserActive } =
    useContext(AuthUserContext);
  const userFoundByUsername = searchUserByUsername(username);

  const docRef = collection(
    firebaseDB,
    `comments/${userFoundByUsername?.uid}/journal`
  );

  useEffect(() => {
    const unSuscribed = onSnapshot(docRef, (comment) => {
      const comments = comment.docs.map((doc) => {
        return {
          idDoc: doc.id,
          ...doc.data(),
        };
      });

      setComments([...comments]);
    });

    return () => unSuscribed();
  }, [userFoundByUsername?.uid]);

  const onSubmitComment = async () => {
    if (opinion.trim().length <= 0) return;

    try {
      await addDoc(docRef, {
        createComment: new Date().getTime(),
        opinion,
        uidUserActive: infoUserActive?.uid,
        username: infoUserActive?.username,
        votesBad: [],
        votesGood: [],
      });

      onResetForm();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <article className={styles.container}>
      <Navbar backColor="#fff" colorLetter="#000" />
      <div className={styles.content}>
        <h2>Opinar sobre {shortName(name)}</h2>

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
          <h2>Opiniones sobre {shortName(name)}</h2>
          <hr />
        </span>

        {comments.length !== 0 ? (
          <div className={styles.container_card_comments}>
            {comments.map((comment) => (
              <CardComment
                comment={comment}
                key={comment.idDoc}
                uidUserOnline={infoUserActive?.uid}
                users={users}
                userFoundByUsername={userFoundByUsername}
              />
            ))}
          </div>
        ) : (
          <div className={styles.not_comments}>
            <p>Aún no hay comentarios sobre {shortName(name)}</p>
          </div>
        )}
      </div>
    </article>
  );
};
