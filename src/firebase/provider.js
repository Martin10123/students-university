import { signOut } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { firebaseAuth, firebaseDB } from "./config";

export const startLogout = async (idDoc) => {
  try {
    await updateDoc(doc(firebaseDB, "users", idDoc), {
      isActive: false,
      activeAgo: new Date().getTime(),
    });

    await signOut(firebaseAuth);
  } catch (error) {
    console.log(error);
  }
};
