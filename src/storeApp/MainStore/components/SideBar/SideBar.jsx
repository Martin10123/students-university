import { AiFillHome, AiOutlineInfoCircle } from "react-icons/ai";
import { BsTags } from "react-icons/bs";
import { CiLogout } from "react-icons/ci";
import { MdWorkOutline } from "react-icons/md";
import { RiMessengerLine } from "react-icons/ri";
import { TbBeachOff } from "react-icons/tb";

import { photoUser } from "../../../../assets";

import { ListItem } from "./ListItem";

import styles from "./sideBar.module.css";

export const SideBar = ({ openSideBar, setOpenSideBar }) => {
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
        <figure className={styles.image_user}>
          <img src={photoUser} alt="Foto de perfil" />
          <figcaption>Martin Elias</figcaption>
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
          <button className={styles.button_logout}>
            <CiLogout />
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
};
