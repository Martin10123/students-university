import { useContext } from "react";
import { CiLogout } from "react-icons/ci";

import { Link, useNavigate } from "react-router-dom";
import { photoUser } from "../../../assets";
import { AuthUserContext } from "../../../context";
import { startLogout } from "../../../firebase";
import { dataNavbar, shortName } from "../../../helpers";

import styles from "./optionsMenu.module.css";

export const OptionsMenu = ({
  openMenu = false,
  backColor = "",
  colorLetter,
}) => {
  const navigate = useNavigate();
  const { infoUserActive } = useContext(AuthUserContext);

  const showOptionStyles = openMenu ? styles.show : styles.hidden;

  const onLogout = async () => {
    await startLogout(infoUserActive?.uid);
  };

  const onGoToProfile = () => {
    navigate(`/${infoUserActive?.username}`);
  };

  return (
    <div
      style={{ background: backColor, color: colorLetter }}
      className={`${styles.container} ${showOptionStyles}`}
    >
      <figure className={styles.image_user} onClick={onGoToProfile}>
        <img
          src={infoUserActive?.photoUrl ? infoUserActive?.photoUrl : photoUser}
          alt="Foto del usuario"
        />
        <figcaption>{shortName(infoUserActive?.displayName)}</figcaption>
      </figure>
      <div className={styles.list_options}>
        {dataNavbar.map(({ name, Icon, linkTo }) => (
          <Link key={name} to={linkTo} style={{ color: colorLetter }}>
            <Icon />
            {name}
          </Link>
        ))}

        <div className={styles.button_logout} onClick={onLogout}>
          <CiLogout />
          Cerrar cesión
        </div>
      </div>
    </div>
  );
};
