import { useContext, useRef, useState } from "react";
import { BsCamera } from "react-icons/bs";
import Swal from "sweetalert2";
import { AuthUserContext } from "../../../../context";
import { loadImageProfileUser } from "../../../../helpers";

import styles from "./loadImage.module.css";

export const LoadImage = ({ setOpenAddImageProfile }) => {
  const [startLoadingPhoto, setStartLoadingPhoto] = useState(false);
  const { infoUserActive } = useContext(AuthUserContext);

  const { displayName, uid } = infoUserActive;

  const fileInputRef = useRef();

  const onChangePhoto = ({ target }) => {
    if (target.files === 0) return;

    setStartLoadingPhoto(true);

    try {
      const file = target.files[0];

      loadImageProfileUser({
        displayName,
        file,
        setOpenAddImageProfile,
        setStartLoadingPhoto,
        uid,
      });
    } catch (error) {
      console.log(error);
      Swal.fire("Error al cargar la imagen", "Intentalo otra vez", "error");
      setStartLoadingPhoto(false);
    }
  };

  return (
    <div className={styles.load_image_container}>
      <div className={styles.load_image_content}>
        <span className={styles.load_image_span}>
          <h2 className={styles.load_image_title}>Seleccionar imagen</h2>
          <button
            disabled={startLoadingPhoto}
            className={styles.load_image_button_close}
            onClick={() => setOpenAddImageProfile(false)}
          >
            X
          </button>
        </span>

        {startLoadingPhoto && (
          <div className={styles.content_spinner}>
            <div className={styles.spinner}></div>
            <p className={styles.loading_photo}>
              {`${displayName} estamos cargando su foto de perfil, por favor espere...`}
            </p>
          </div>
        )}

        <input
          type="file"
          ref={fileInputRef}
          onChange={onChangePhoto}
          style={{ display: "none" }}
        />

        <button
          disabled={startLoadingPhoto}
          className={styles.load_image_button}
          onClick={() => fileInputRef.current.click()}
        >
          <BsCamera />
          Agregar imagen
        </button>
      </div>
    </div>
  );
};
