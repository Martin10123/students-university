import { AiFillHome, AiOutlineInfoCircle } from "react-icons/ai";
import { BsTags } from "react-icons/bs";
import { CiLogout } from "react-icons/ci";
import { MdWorkOutline } from "react-icons/md";
import { RiMessengerLine } from "react-icons/ri";
import { TbBeachOff } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

import { photoUser } from "../../../../assets";
import { startLogout } from "../../../../firebase";
import { shortName } from "../../../../helpers";

import { ListItem } from "./ListItem";

import styles from "./sideBar.module.css";

export const SideBar = ({ openSideBar, setOpenSideBar, infoUserActive }) => {
  const navigate = useNavigate();

  const onLogout = async () => {
    await startLogout(infoUserActive?.uid);
  };

  const onGoToProfile = () => {
    navigate(`/${infoUserActive?.username}`);
  };

  return (
    <div
      className={`${styles.container_side} ${
        openSideBar ? styles.show_side : ""
      }`}
    >
      <div
        className={styles.back_color}
        onClick={() => setOpenSideBar(false)}
      ></div>
      <div className={styles.list}>
        <figure className={styles.image_user} onClick={onGoToProfile}>
          <img
            src={
              infoUserActive?.photoUrl ? infoUserActive?.photoUrl : photoUser
            }
            alt="Foto de perfil"
          />
          <figcaption>{shortName(infoUserActive?.displayName)}</figcaption>
        </figure>

        <div className={styles.content_all_item}>
          <ListItem
            Icon={BsTags}
            title="Vender articulo"
            linkTo="/store/selfArticle"
          />

          <ListItem Icon={AiFillHome} title="Home" linkTo="/" />

          <ListItem
            Icon={TbBeachOff}
            title="Vacacionales"
            linkTo="/vacations"
          />

          <ListItem Icon={RiMessengerLine} title="Mensajes" linkTo="/chat" />

          <ListItem Icon={MdWorkOutline} title="Ofertas" linkTo="/jobOffert" />

          <ListItem
            Icon={AiOutlineInfoCircle}
            title="Nosotros"
            linkTo="/about"
          />
        </div>
        <div className={styles.last_item}>
          <button onClick={onLogout} className={styles.button_logout}>
            <CiLogout />
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
};
