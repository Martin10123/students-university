import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { CgProfile } from "react-icons/cg";

import { EditComment, SureDelete } from "../";
import { useScroll } from "../../../hook";
import { logicVotes } from "../../../helpers";

import styles from "./buttonCard.module.css";
import { firebaseDB } from "../../../firebase";
import { deleteDoc, doc } from "firebase/firestore";

export const ButtonsCard = ({
  comment,
  isSameUser,
  uidUserOnline,
  userFoundByUsername,
}) => {
  const [openSureDelete, setOpenSureDelete] = useState(false);
  const [openEditComment, setOpenEditComment] = useState(false);
  const pathRef = `comments/${userFoundByUsername?.uid}/journal/${comment?.idDoc}`;

  const navigate = useNavigate();

  const { votesGood, votesBad, username } = comment;

  const startDeleteOrUpdateComment = (type) => {
    if (type === "update") {
      setOpenEditComment(true);
    } else {
      setOpenSureDelete(true);
    }
  };

  const onReactionComment = async (type) => {
    try {
      await logicVotes(comment, type, uidUserOnline, pathRef);
    } catch (error) {
      console.log(error);
    }
  };

  const votesGoodSelected = votesGood.includes(uidUserOnline)
    ? { background: "#0099ff", color: "#fff" }
    : {};

  const votesBadSelected = votesBad.includes(uidUserOnline)
    ? { background: "#ff0000", color: "#fff" }
    : {};

  const onDeleteComment = async () => {
    try {
      await deleteDoc(doc(firebaseDB, pathRef));

      setOpenSureDelete(false);
    } catch (error) {
      console.log(error);
    }
  };

  useScroll([openSureDelete, openEditComment]);

  return (
    <div
      className={styles.buttons_card}
      style={{ gridTemplateColumns: `repeat(${isSameUser ? 5 : 3}, 1fr)` }}
    >
      <button
        onClick={() => onReactionComment("votesGood")}
        style={votesGoodSelected}
      >
        <FcLike /> {votesGood.length}
      </button>
      <button
        onClick={() => onReactionComment("votesBad")}
        style={votesBadSelected}
      >
        <FcLikePlaceholder /> {votesBad.length}
      </button>
      <button onClick={() => navigate(`/${username}`)}>
        <CgProfile />
      </button>

      {isSameUser && (
        <>
          <button onClick={() => startDeleteOrUpdateComment("update")}>
            <AiOutlineEdit />
          </button>
          <button
            className={styles.button_delete_red}
            onClick={() => startDeleteOrUpdateComment("delete")}
          >
            <AiOutlineDelete />
          </button>
        </>
      )}

      {openSureDelete && (
        <SureDelete
          onDeleteComment={onDeleteComment}
          setOpenSureDelete={setOpenSureDelete}
        />
      )}
      {openEditComment && (
        <EditComment
          comment={comment}
          setOpenEditComment={setOpenEditComment}
          userFoundByUsername={userFoundByUsername}
        />
      )}
    </div>
  );
};
