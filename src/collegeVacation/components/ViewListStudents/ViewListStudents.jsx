import { BiArrowBack } from "react-icons/bi";

import { CardListStudent } from "./CardListStudent";

import styles from "./viewListStudents.module.css";

export const ViewListStudents = ({
  infoUserActive,
  setOpenListStudents,
  users,
  vacation,
}) => {
  const { idDoc, inscribed, uid } = vacation;

  const isTheCreator = infoUserActive.uid === uid;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.nav}>
          <BiArrowBack onClick={() => setOpenListStudents(false)} />
          <p>Estudiantes inscritos</p>
        </div>

        <div className={styles.list_students}>
          {users.map(
            (user) =>
              inscribed.includes(user.uid) && (
                <CardListStudent
                  idDoc={idDoc}
                  user={user}
                  isTheCreator={isTheCreator}
                  key={user.idDoc}
                />
              )
          )}
        </div>
      </div>
    </div>
  );
};
