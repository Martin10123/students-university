import { useState } from "react";
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
        <InfoVacation
          vacation={vacation}
          setOpenListStudents={setOpenListStudents}
        />

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
