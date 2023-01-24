import { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { BsPhone } from "react-icons/bs";
import { MdAlternateEmail } from "react-icons/md";
import {
  facebookIcon,
  githubIcon,
  gmailIcon,
  instagram,
  whatsaap,
} from "../../assets";

import styles from "./footer.module.css";

export const FooterPage = () => {
  const [copy, setCopy] = useState("");

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText("Martinsimarra4@gmail.com");

      setCopy("Se copio el email");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <footer className={styles.container}>
      <p className={styles.title}>
        Esta aplicación fue creada con fines academicos, intentado satisfacer
        las necesidades de los universitarios del tecnologico comfenalco.
      </p>

      <div className={styles.my_info}>
        <p>
          <AiOutlineUser />
          Martin Elias
        </p>
        <p>
          <MdAlternateEmail />
          Martinsimarra@gmail.com
        </p>
        <p>
          <BsPhone />
          3006830624
        </p>
      </div>

      <div className={styles.social_network}>
        <a href="https://www.facebook.com/Martin101206" target="_blank">
          <img src={facebookIcon} alt="Facebook" />
        </a>
        <a
          href="https://api.whatsapp.com/send?phone=3006830624&text=Hola%20mucho%20gusto"
          target="_blank"
        >
          <img src={whatsaap} alt="WhatsApp" />
        </a>
        <a href="https://mail.google.com/mail/u/0/#inbox" target="_blank">
          <img src={gmailIcon} alt="Gmail" />
        </a>
        <a href="https://www.instagram.com/martinelias1012/" target="_blank">
          <img src={instagram} alt="Instagram" />
        </a>
        <a href="https://github.com/Martin10123" target="_blank">
          <img src={githubIcon} alt="Github" />
        </a>
      </div>
    </footer>
  );
};
