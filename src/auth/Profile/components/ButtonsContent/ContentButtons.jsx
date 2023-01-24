import { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { BsChatLeft } from "react-icons/bs";
import { SlLike, SlDislike } from "react-icons/sl";
import { TfiCommentAlt } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";
import { ChooseContact, EditProfile } from "../";
import { useScroll } from "../../../../hook";

import styles from "./buttons.module.css";

export const ContentButtons = () => {
  const [openContact, setOpenContact] = useState(false);
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const navigate = useNavigate();

  useScroll([openEditProfile, openContact]);

  const onGoToCommentUser = () => {
    navigate(`/opinions/a/a`);
  };

  const likeToUser = (type) => {
    console.log({ type });
  };

  return (
    <>
      <div className={styles.box_buttons_vote}>
        <button
          className={styles.button_vote}
          onClick={() => likeToUser("votesGood")}
        >
          <SlLike /> 0
        </button>
        <button
          className={styles.button_vote}
          onClick={() => likeToUser("votesBad")}
        >
          <SlDislike /> 0
        </button>
        <button
          className={styles.button_vote}
          onClick={() => setOpenContact(true)}
        >
          <BsChatLeft />
          Contactar
        </button>
        <button className={styles.button_vote} onClick={onGoToCommentUser}>
          <TfiCommentAlt />
          Dar opinion
        </button>
      </div>

      <button
        className={styles.button_edit_profile}
        onClick={() => setOpenEditProfile(true)}
      >
        <AiOutlineEdit />
        Editar perfil
      </button>

      {openContact && <ChooseContact setOpenContact={setOpenContact} />}
      {openEditProfile && (
        <EditProfile setOpenEditProfile={setOpenEditProfile} />
      )}
    </>
  );
};
