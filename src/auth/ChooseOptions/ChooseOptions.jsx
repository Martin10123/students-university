import { useNavigate } from "react-router-dom";
import styles from "./choose.module.css";

export const ChooseOptions = () => {
  const navigate = useNavigate();

  const navigateToPage = (what) => {
    what === "login" ? navigate("/auth/login") : navigate("/auth/register");
  };

  return (
    <div className={styles.container}>
      <p className={styles.title_app}>Search University</p>
      <div className={styles.content}>
        <h2>Found your answers</h2>
        <p>
          Encuentra lo que necesitas aqui! <br />
          ayudas con tus tareas, explicaciones, personas para vacacionales,
          vender articulos...
        </p>

        <div className={styles.buttons}>
          <button
            className={styles.button}
            onClick={() => navigateToPage("login")}
          >
            Ingresar
          </button>
          <button
            className={styles.button}
            onClick={() => navigateToPage("register")}
          >
            Registrarse
          </button>
        </div>
      </div>
    </div>
  );
};
