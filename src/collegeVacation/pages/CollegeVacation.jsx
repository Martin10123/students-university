import { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { useScroll } from "../../hook";

import { Navbar } from "../../ui/Navbar";
import {
  CardCollegeVacation,
  CreateCollegeVacation,
  WelcomeVacation,
} from "../components";

import styles from "./vacation.module.css";

export const CollegeVacation = () => {
  const [openCreator, setOpenCreator] = useState(false);

  useScroll([openCreator]);

  return (
    <section className={styles.container}>
      <Navbar backColor="#0099ff" colorLetter="#fff" />
      <div className={styles.content}>
        <WelcomeVacation setOpenCreator={setOpenCreator} />

        <hr />

        <div className={styles.content_info_vacation}>
          <h2>Encontrar vacacional</h2>

          <div className={styles.box_form}>
            <BiSearchAlt />
            <input
              type="text"
              placeholder="Buscar vacacional..."
              className={styles.input_form}
            />
          </div>

          <div className={styles.content_card_vacation}>
            <CardCollegeVacation />
          </div>
        </div>

        {openCreator && (
          <CreateCollegeVacation setOpenCreator={setOpenCreator} />
        )}
      </div>
    </section>
  );
};
