import { useState } from "react";

import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { CgProfile } from "react-icons/cg";

import { EditComment, SureDelete } from "../";
import { useScroll } from "../../../hook";

import styles from "./buttonCard.module.css";

export const ButtonsCard = () => {
  const [openSureDelete, setOpenSureDelete] = useState(false);
  const [openEditComment, setOpenEditComment] = useState(false);

  const startDeleteOrUpdateComment = (type) => {
    if (type === "update") {
      setOpenEditComment(true);
    } else {
      setOpenSureDelete(true);
    }
  };

  useScroll([openSureDelete, openEditComment]);

  return (
    <div className={styles.buttons_card}>
      <button>
        <FcLike /> 0
      </button>
      <button>
        <FcLikePlaceholder /> 0
      </button>
      <button>
        <CgProfile />
      </button>

      <button onClick={() => startDeleteOrUpdateComment("update")}>
        <AiOutlineEdit />
      </button>

      <button
        className={styles.button_delete_red}
        onClick={() => startDeleteOrUpdateComment("delete")}
      >
        <AiOutlineDelete />
      </button>

      {openSureDelete && <SureDelete setOpenSureDelete={setOpenSureDelete} />}
      {openEditComment && (
        <EditComment setOpenEditComment={setOpenEditComment} />
      )}
    </div>
  );
};
