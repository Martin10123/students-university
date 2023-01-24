import { useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { BsCameraFill } from "react-icons/bs";
import { SlDislike, SlLike } from "react-icons/sl";
import { useParams } from "react-router-dom";

import { photoUser } from "../../../assets";
import { useScroll } from "../../../hook";

import { Navbar } from "../../../ui/Navbar";
import { ContentButtons, ListItem, LoadImage } from "../components";

import styles from "./profilePage.module.css";

export const ProfilePage = () => {
  const { username } = useParams();
  const [openAddImageProfile, setOpenAddImageProfile] = useState(false);
  useScroll([openAddImageProfile]);

  const onLogout = () => {
    console.log(username);
    console.log("logout");
  };

  return (
    <div className={styles.container}>
      <Navbar backColor="#fff" colorLetter="#000" />
      <div className={styles.content}>
        <figure className={styles.image_user}>
          <img src={photoUser} alt={`Foto de perfil de ${"displayName"}`} />
          <BsCameraFill onClick={() => setOpenAddImageProfile(true)} />
        </figure>

        <div className={styles.name_votes_porcent}>
          <p>{"displayName"}</p>

          <span className={styles.content_porcent}>
            <p className={styles.item}>
              <SlLike /> {0}%
            </p>
            <p className={styles.item}>
              <SlDislike /> {0}%
            </p>
          </span>
        </div>

        <div className={styles.content_info}>
          <div className={styles.each_info_personal}>
            <ListItem />

            <ContentButtons />
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
