import { useContext, useEffect, useMemo, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { BiSearchAlt } from "react-icons/bi";
import { AuthUserContext } from "../../context";
import { firebaseDB } from "../../firebase";
import { useScroll } from "../../hook";

import { Navbar } from "../../ui/Navbar";
import {
  CardCollegeVacation,
  CreateCollegeVacation,
  WelcomeVacation,
} from "../components";
import { getVacationBy } from "../components/helpers/getVacationBy";

import styles from "./vacation.module.css";

export const CollegeVacation = () => {
  const { infoUserActive, users } = useContext(AuthUserContext);

  const [openCreator, setOpenCreator] = useState(false);
  const [vacations, setVacations] = useState([]);
  const [searchVacation, setSearchVacation] = useState("");

  useScroll([openCreator]);

  useEffect(() => {
    const docRef = query(
      collection(firebaseDB, "collegeVacation"),
      orderBy("subject", "asc")
    );

    const unSuscribed = onSnapshot(docRef, (vaction) => {
      const collegeVacation = vaction.docs.map((doc) => {
        return {
          idDoc: doc.id,
          ...doc.data(),
        };
      });

      setVacations(collegeVacation);
    });

    return () => unSuscribed();
  }, []);

  const vacationsFilter = useMemo(
    () => getVacationBy(vacations, searchVacation),
    [vacations, searchVacation]
  );

  return (
    <section className={styles.container}>
      <Navbar backColor="#0099ff" colorLetter="#fff" />
      <div className={styles.content}>
        <WelcomeVacation setOpenCreator={setOpenCreator} />

        <hr />

        <div id="found_vacation" className={styles.content_info_vacation}>
          <h2>Encontrar vacacional</h2>

          <div className={styles.content_filter_by}>
            <p className={styles.title_filter}>
              Puedes filter por nombre de la materia, por el nombre del creador,
              por el numero de telefono registrado o por nombre del profesor
            </p>
          </div>

          <div className={styles.box_form}>
            <BiSearchAlt />
            <input
              type="text"
              placeholder="Buscar vacacional..."
              className={styles.input_form}
              value={searchVacation}
              onChange={(e) => setSearchVacation(e.target.value)}
            />
          </div>

          {vacationsFilter.length !== 0 ? (
            <div className={styles.content_card_vacation}>
              {vacationsFilter.map(
                (vacation) =>
                  !vacation?.deletePull && (
                    <CardCollegeVacation
                      key={vacation.idDoc}
                      vacation={vacation}
                      infoUserActive={infoUserActive}
                      users={users}
                    />
                  )
              )}
            </div>
          ) : (
            <p className={styles.not_vacations_by_filter}>
              No se ha agregado ninguna encuesta aún
            </p>
          )}
        </div>

        {openCreator && (
          <CreateCollegeVacation
            infoUserActive={infoUserActive}
            setOpenCreator={setOpenCreator}
          />
        )}
      </div>
    </section>
  );
};
