import { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { BsChatLeft } from "react-icons/bs";
import { SlLike, SlDislike } from "react-icons/sl";
import { TfiCommentAlt } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";
import { ChooseContact, EditProfile } from "../";
import { logicVotes } from "../../../../helpers";
import { useScroll } from "../../../../hook";

import styles from "./buttons.module.css";

export const ContentButtons = ({
  userSelected,
  isUserActive,
  uidUserActive,
}) => {
  const { username, displayName, votesGood, votesBad, phoneNumber, idDoc } =
    userSelected;

  const [openContact, setOpenContact] = useState(false);
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const navigate = useNavigate();

  useScroll([openEditProfile, openContact]);

  const onGoToCommentUser = () => {
    navigate(`/opinions/${username}/${displayName}`);
  };

  const likeToUser = async (type) => {
    await logicVotes(userSelected, type, uidUserActive, idDoc);
  };

  const votesGoodSelected = votesGood.includes(uidUserActive)
    ? { background: "#00ff00", color: "#fff" }
    : {};

  const votesBadSelected = votesBad.includes(uidUserActive)
    ? { background: "#ff0000", color: "#fff" }
    : {};

  return (
    <>
      {!isUserActive && (
        <div className={styles.box_buttons_vote}>
          <button
            className={styles.button_vote}
            onClick={() => likeToUser("votesGood")}
            style={votesGoodSelected}
          >
            <SlLike /> {votesGood.length}
          </button>
          <button
            className={styles.button_vote}
            onClick={() => likeToUser("votesBad")}
            style={votesBadSelected}
          >
            <SlDislike /> {votesBad.length}
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
      )}

      {isUserActive && (
        <button
          className={styles.button_edit_profile}
          onClick={() => setOpenEditProfile(true)}
        >
          <AiOutlineEdit />
          Editar perfil
        </button>
      )}

      {openContact && (
        <ChooseContact
          setOpenContact={setOpenContact}
          phoneNumber={phoneNumber}
        />
      )}
      {openEditProfile && (
        <EditProfile
          setOpenEditProfile={setOpenEditProfile}
          userSelected={userSelected}
        />
      )}
    </>
  );
};
