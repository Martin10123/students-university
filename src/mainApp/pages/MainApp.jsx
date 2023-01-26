import { BiSearchAlt } from "react-icons/bi";
import { allSubject } from "../../helpers/subjects";
import { useScroll } from "../../hook";
import { useSearchUsers } from "../hook/useSearchUsers";
import { Navbar } from "../../ui/Navbar";
import { CardStudents, FilterOptions } from "../components";

import styles from "./mainApp.module.css";

export const MainApp = () => {
  const {
    filterByCategory,
    onInputChange,
    onSelectSubjects,
    openFilter,
    search,
    setOpenFilter,
    usersFilter,
    infoUserActive,
  } = useSearchUsers();

  useScroll([openFilter]);

  return (
    <main className={styles.container}>
      <Navbar backColor="#4e42d4" colorLetter="#fff" />

      <div className={styles.content}>
        <div className={styles.welcome_page}>
          <h1>Encuentra ayuda aqui!</h1>
          <p>
            Encuentra expertos en MATEMATICAS, FISICA, DISEÑO, ALGORITMO,
            CALCULO, PSICOLOGIA, ECUENTRA PERSONAS PARA HACER VACACIONAL,
            cualquier cosa...
          </p>

          <div className={styles.content_input_search}>
            <BiSearchAlt />
            <input
              type="text"
              placeholder="Buscar..."
              name="search"
              value={search}
              onChange={onInputChange}
            />
          </div>

          <div className={styles.filter_catagories}>
            <p onClick={() => setOpenFilter(true)}>
              {filterByCategory.length !== 0
                ? filterByCategory[0]
                : "Filtrar por categoria"}
            </p>
          </div>

          {openFilter && (
            <FilterOptions
              data={allSubject}
              setOpenFilter={setOpenFilter}
              onSelectData={onSelectSubjects}
              choosedBefore={filterByCategory}
            />
          )}
        </div>
        <div>
          <h2 className={styles.title_result}>Resultados</h2>
          <hr />

          {usersFilter.length !== 0 ? (
            <div className={styles.container_cards}>
              {usersFilter.map(
                (user) =>
                  user.uid !== infoUserActive?.uid &&
                  user.selectFormUser === "Brindar" && (
                    <CardStudents key={user.idDoc} {...user} />
                  )
              )}
            </div>
          ) : (
            <div className={styles.no_result_users}>
              <p>
                No se encontraron usuarios con el nombre: <span>{search}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
