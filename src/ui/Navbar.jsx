import { useState } from "react";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { Link } from "react-router-dom";
import { logoApp } from "../assets";
import { OptionsMenu } from "../mainApp/components";

import styles from "./navbar.module.css";

export const Navbar = ({ backColor = "", colorLetter = "" }) => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <nav className={styles.navbar}>
      <Link to="/">
        <img
          src={logoApp}
          alt="Logo de la aplicación"
          className={styles.image_logo}
        />
      </Link>

      <AiOutlineMenuUnfold onClick={() => setOpenMenu(!openMenu)} />
      <OptionsMenu
        openMenu={openMenu}
        backColor={backColor}
        colorLetter={colorLetter}
      />
    </nav>
  );
};
