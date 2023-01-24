import { useState } from "react";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { BiSearchAlt } from "react-icons/bi";
import { meetingOffert } from "../../assets";
import { useScroll } from "../../hook";
import { Navbar } from "../../ui/Navbar";
import { AddOffert, CardOffert } from "../components";

import styles from "./JobOffers.module.css";

export const JobOffers = () => {
  const [openAddOffert, setOpenAddOffert] = useState(false);

  useScroll([openAddOffert]);

  return (
    <div className={styles.container}>
      <Navbar backColor="#fff" colorLetter="#000" />

      <div className={styles.content}>
        <div className={styles.container_info_and_image}>
          <div className={styles.content_info_page}>
            <h1>Ofertas para practicantes</h1>
            <p>
              Bienvenid@s, tienes una oferta laboral y buscas estudiantes de
              semestres superiores para brindarles una oportunidad, estas en el
              lugar correcto. Aqui encontraras estudiantes dispuestos a aprender
              y a seguir adquiriendo conocimiento para ser el mejor en su area.
            </p>

            <div className={styles.buttons_offers}>
              <button
                className={styles.button_add}
                onClick={() => setOpenAddOffert(true)}
              >
                <AiOutlineAppstoreAdd /> Agregar oferta
              </button>
              <button className={styles.button_search}>
                <BiSearchAlt />
                Buscar oferta
              </button>
            </div>
          </div>
          <img
            className={styles.image_offert}
            src={meetingOffert}
            alt="Imagen relacionada al trabajo"
          />
        </div>

        <div className={styles.title_result}>
          <h2>Ofertas</h2>

          <div className={styles.form_input_search_offert}>
            <input type="text" placeholder="Buscar oferta..." />
            <BiSearchAlt />
          </div>
        </div>

        <div className={styles.container_card}>
          <CardOffert />
        </div>
      </div>

      {openAddOffert && <AddOffert setOpenAddOffert={setOpenAddOffert} />}
    </div>
  );
};
