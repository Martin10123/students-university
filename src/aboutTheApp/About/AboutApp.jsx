import { aboutData } from "../../helpers";
import { Navbar } from "../../ui/Navbar";
import { FooterPage } from "../Footer/Footer";

import styles from "./about.module.css";

export const AboutApp = () => {
  return (
    <section className={styles.container}>
      <Navbar backColor="#fff" colorLetter="#000" />
      <div className={styles.content}>
        <h1 className={styles.title_about}>About Us</h1>

        <p className={styles.paragrah_explain}>
          Esta aplicación fue creada con fines educativos, donde me di cuenta
          que muchas personas tenian la necesidad de vender cosas, buscar
          personal para los vacacionales, buscar ayuda de otros compañeros de la
          universidad para que les ayudaran en sus trabajos y otras cosas. Esta
          aplicación les ayuda a resolver todo eso, brindandoles los diferentes
          recursos para que hacerles más facil la vida.
        </p>

        <h2 className={styles.herramient_used}>
          Herramientras utilizadas para construir la app
        </h2>

        <div className={styles.content_list}>
          {aboutData.map((data) => (
            <a
              key={data.name}
              href={data.linkToPage}
              target="_blank"
              className={styles.list_item}
            >
              <img
                src={data.img}
                alt={data.alt}
                className={styles.logo_app_used}
              />
              <h3 className={styles.name_app_list}>{data.name}</h3>
              <p className={styles.info_app_list}>{data.info}</p>
            </a>
          ))}
        </div>
      </div>

      <FooterPage />
    </section>
  );
};
