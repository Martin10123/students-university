import { doc, updateDoc } from "firebase/firestore/lite";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { FirebaseDB, storage } from "../firebase";

export const loadImageProfileUser = (
  displayName,
  file,
  setStartLoadingPhoto,
  uid,
  idDoc
) => {
  if (!file) throw Error("No hay imagen");

  const storageRef = ref(storage, `images_profile/${uid}__${displayName}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );

      setStartLoadingPhoto(progress);
    },
    (error) => {
      console.log(error.code);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        const docRef = doc(FirebaseDB, "users", idDoc);
        updateDoc(docRef, {
          photoUrl: downloadURL,
        });
      });
    }
  );
};
