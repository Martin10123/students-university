import { useRef, useState } from "react";
import { BsCamera } from "react-icons/bs";

import styles from "./loadImage.module.css";

export const LoadImage = ({ setOpenAddImageProfile }) => {
  const [startLoadingPhoto, setStartLoadingPhoto] = useState(0);
  const fileInputRef = useRef();

  const onChangePhoto = ({ target }) => {
    if (target.files === 0) return;

    setStartLoadingPhoto(true);

    const file = target.files[0];

    console.log(file);

    setStartLoadingPhoto(false);
  };

  return (
    <div className={styles.load_image_container}>
      <div className={styles.load_image_content}>
        <span className={styles.load_image_span}>
          <h2 className={styles.load_image_title}>Seleccionar imagen</h2>
          <button
            className={styles.load_image_button_close}
            onClick={() => setOpenAddImageProfile(false)}
          >
            X
          </button>
        </span>

        {startLoadingPhoto !== 0 && (
          <p className={styles.loading_photo}>{`${startLoadingPhoto}%`}</p>
        )}

        <input
          type="file"
          ref={fileInputRef}
          onChange={onChangePhoto}
          style={{ display: "none" }}
        />

        <button
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
