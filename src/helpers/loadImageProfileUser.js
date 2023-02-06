import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Swal from "sweetalert2";
import { firebaseDB, storage } from "../firebase";

export const loadImageProfileUser = ({
  displayName,
  file,
  setStartLoadingPhoto,
  setOpenAddImageProfile,
  uid,
}) => {
  if (!file) throw Error("No hay imagen");

  const storageRef = ref(storage, `images_profile/${uid}__${displayName}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    "state_changed",
    () => {},
    (error) => {
      console.log(error.code);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        const docRef = doc(firebaseDB, "users", uid);

        updateDoc(docRef, {
          photoUrl: downloadURL,
        })
          .then(() => {
            Swal.fire(
              "Se cargo correctamente",
              "Se guardo correctamente la imagen",
              "success"
            );
          })
          .catch((error) => {
            console.log(error);
            Swal.fire(
              "Error al cargar la imagen",
              "Intentalo otra vez",
              "error"
            );
          });
      });

      setStartLoadingPhoto(false);
      setOpenAddImageProfile(false);
    }
  );
};
