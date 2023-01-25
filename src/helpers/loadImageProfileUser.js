import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { firebaseDB, storage } from "../firebase";

export const loadImageProfileUser = ({
  displayName,
  file,
  idDoc,
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
        const docRef = doc(firebaseDB, "users", idDoc);

        updateDoc(docRef, {
          photoUrl: downloadURL,
        })
          .then(() => {})
          .catch((error) => console.log(error));
      });

      setStartLoadingPhoto(false);
      setOpenAddImageProfile(false);
    }
  );
};
