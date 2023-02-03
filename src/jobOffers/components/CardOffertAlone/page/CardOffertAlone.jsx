import { useState } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { FcIdea } from "react-icons/fc";
import { GiBrain } from "react-icons/gi";
import { IoIosArrowBack } from "react-icons/io";
import { MdAlternateEmail } from "react-icons/md";

import { firebaseDB } from "../../../../firebase";
import { RequirementOffert, UpdateOffer } from "../components";
import { SureDelete } from "../../../../boxComments/components/Edit_messageDelete/SureDelete";
import { useCloseModalOutside } from "../../../../hook";

import styles from "./cardOffertAlone.module.css";

export const CardOffertAlone = ({
  creatorUser,
  offerJob,
  setViewCardAlone,
}) => {
  const {
    closeOffer,
    descOffer,
    emailsArray,
    habilitiesArray,
    idDoc,
    nameOffer,
    numberProfesionals,
    requirementArray,
    semesterStudents,
  } = offerJob;
  const [openSureDelete, setOpenSureDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  const ref = useCloseModalOutside(() => setViewCardAlone(false));

  const onDeleteOffer = async () => {
    try {
      await deleteDoc(doc(firebaseDB, `offersJob/${idDoc}`));
      document.body.style.overflow = "auto";

      setViewCardAlone(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className={styles.container}>
        <div className={styles.nav_return}>
          <IoIosArrowBack onClick={() => setViewCardAlone(false)} />
          <p>Ver oferta</p>
        </div>
        <div ref={ref} className={styles.content_info}>
          <h2 className={styles.name_offert}>{nameOffer}</h2>

          <p className={styles.desc_offert}>{descOffer}</p>

          <RequirementOffert
            data={requirementArray}
            title="Requisitos"
            Icon={FcIdea}
          />

          <RequirementOffert
            data={habilitiesArray}
            title="Habilidades"
            Icon={GiBrain}
          />

          <RequirementOffert
            data={emailsArray}
            title="Enviar CV a: "
            Icon={MdAlternateEmail}
          />

          <div className={styles.how_much_profesionals_semester_required}>
            <p>Trabajadores requeridos: </p>
            <span>{numberProfesionals}</span>
          </div>

          <div className={styles.how_much_profesionals_semester_required}>
            <p>Semestre requerido requeridos: </p>
            <span>{semesterStudents}</span>
          </div>

          {creatorUser && (
            <div className={styles.buttons_card_alone}>
              <button
                className={styles.button_close}
                onClick={() => setOpenUpdate(true)}
              >
                Editar
              </button>
              <button
                className={styles.button_close}
                onClick={() => setOpenSureDelete(true)}
              >
                Borrar
              </button>
            </div>
          )}
        </div>
      </section>

      {openSureDelete && (
        <SureDelete
          setOpenSureDelete={setOpenSureDelete}
          onDeleteComment={onDeleteOffer}
        />
      )}

      {openUpdate && (
        <UpdateOffer setOpenUpdate={setOpenUpdate} offerJob={offerJob} />
      )}
    </>
  );
};
