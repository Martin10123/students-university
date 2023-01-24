import { IoIosArrowBack } from "react-icons/io";

import styles from "./cardOffertAlone.module.css";

const RequirementOffert = ({
  title,
  data = ["Ser pilo", "Ser humilde", "Ser proactivo", "Ser amable"],
}) => {
  return (
    <div className={styles.box_requirement_offert}>
      <h3>{title}</h3>

      {data.map((text) => (
        <p key={text}>{text}</p>
      ))}
    </div>
  );
};

export const CardOffertAlone = () => {
  return (
    <section className={styles.container}>
      <div className={styles.nav_return}>
        <IoIosArrowBack />
        <p>Ver oferta</p>
      </div>
      <div className={styles.content_info}>
        <h2 className={styles.name_offert}>Servicio al cliente</h2>

        <p className={styles.desc_offert}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab voluptate
          officia ducimus ratione dolor nesciunt minima at reiciendis labore
          ipsa. Explicabo voluptatem aspernatur ullam aliquam tempora harum
          tempore commodi veniam. Lorem ipsum dolor sit amet consectetur,
          adipisicing elit. Ab voluptate officia ducimus ratione dolor nesciunt
          minima at reiciendis labore ipsa. Explicabo voluptatem aspernatur
          ullam aliquam tempora harum tempore commodi veniam. Lorem ipsum dolor
          sit amet consectetur, adipisicing elit. Ab voluptate officia ducimus
          ratione dolor nesciunt minima at reiciendis labore ipsa. Explicabo
          voluptatem aspernatur ullam aliquam tempora harum tempore commodi
          veniam.
        </p>

        <RequirementOffert title="Requisitos" />

        <div className={styles.how_much_profesionals_semester_required}>
          <p>Trabajadores requeridos: </p>
          <span>5</span>
        </div>

        <div className={styles.how_much_profesionals_semester_required}>
          <p>Semestre requerido requeridos: </p>
          <span>5</span>
        </div>

        <RequirementOffert title="Habilidades" />

        <RequirementOffert title="Enviar CV a: " />

        <button className={styles.button_close}>Cerrar</button>
      </div>
    </section>
  );
};
