import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { firebaseDB } from "../../../firebase";
import { ViewListStudents } from "../ViewListStudents/ViewListStudents";
import { ButtonsOnlyCreatorPull } from "./ButtonsOnlyCreatorPull";
import { InfoVacation } from "./InfoVacation";
import { MessageAndButtonInscribed } from "./MessageAndButtonInscribed";

import styles from "./cardCollegeVacation.module.css";

export const CardCollegeVacation = ({ infoUserActive, vacation, users }) => {
  const [openListStudents, setOpenListStudents] = useState(false);

  return (
    <>
      <div className={styles.info_card}>
        <InfoVacation vacation={vacation} />

        <MessageAndButtonInscribed
          infoUserActive={infoUserActive}
          vacation={vacation}
        />

        <ButtonsOnlyCreatorPull
          infoUserActive={infoUserActive}
          vacation={vacation}
          setOpenListStudents={setOpenListStudents}
        />
      </div>

      {openListStudents && (
        <ViewListStudents
          setOpenListStudents={setOpenListStudents}
          users={users}
          infoUserActive={infoUserActive}
          vacation={vacation}
        />
      )}
    </>
  );
};
