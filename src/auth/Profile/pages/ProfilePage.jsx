import { useContext, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { BsCameraFill } from "react-icons/bs";
import { SlDislike, SlLike } from "react-icons/sl";
import { useParams } from "react-router-dom";

import { photoUser } from "../../../assets";
import { AuthUserContext } from "../../../context";
import { startLogout } from "../../../firebase";
import { useScroll } from "../../../hook";
import { LoadingPage } from "../../../LoadingPage/LoadingPage";

import { Navbar } from "../../../ui/Navbar";
import { ContentButtons, ListItem, LoadImage } from "../components";

import styles from "./profilePage.module.css";

export const ProfilePage = () => {
  const [openAddImageProfile, setOpenAddImageProfile] = useState(false);
  const { username } = useParams();

  const { searchUserByUsername, infoUserActive } = useContext(AuthUserContext);

  const userSelected = searchUserByUsername(username);
  const isUserActive = userSelected?.uid === infoUserActive?.uid;

  useScroll([openAddImageProfile]);

  const onLogout = async () => {
    await startLogout(infoUserActive?.idDoc);
  };

  if (!userSelected) {
    return <LoadingPage />;
  }

  const { displayName, photoUrl, votesGood, votesBad } = userSelected;

  const totalVotes = votesBad.length + votesGood.length;
  const porcentGood = (votesGood.length / totalVotes) * 100;
  const porcentBad = (votesBad.length / totalVotes) * 100;

  return (
    <div className={styles.container}>
      <Navbar backColor="#fff" colorLetter="#000" />
      <div className={styles.content}>
        <figure className={styles.image_user}>
          <img
            src={photoUrl ? photoUrl : photoUser}
            alt={`Foto de perfil de ${displayName}`}
          />

          {isUserActive && (
            <BsCameraFill onClick={() => setOpenAddImageProfile(true)} />
          )}
        </figure>

        <div className={styles.name_votes_porcent}>
          <p>{displayName}</p>

          <span className={styles.content_porcent}>
            <p className={styles.item}>
              <SlLike /> {porcentGood || 0}%
            </p>
            <p className={styles.item}>
              <SlDislike /> {porcentBad || 0}%
            </p>
          </span>
        </div>

        <div className={styles.content_info}>
          <div className={styles.each_info_personal}>
            <ListItem isUserActive={isUserActive} {...userSelected} />

            <ContentButtons
              isUserActive={isUserActive}
              userSelected={userSelected}
              uidUserActive={infoUserActive?.uid}
            />
          </div>

          <hr />

          <button className={styles.button_logout} onClick={onLogout}>
            <BiLogOut /> Cerrar cessión
          </button>
        </div>
      </div>

      {openAddImageProfile && (
        <LoadImage setOpenAddImageProfile={setOpenAddImageProfile} />
      )}
    </div>
  );
};
