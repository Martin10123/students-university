import { signOut } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { firebaseAuth, firebaseDB } from "./config";

export const startLogout = async (uidUser) => {
  try {
    await signOut(firebaseAuth);

    await updateDoc(doc(firebaseDB, "users", uidUser), {
      isActive: false,
      activeAgo: new Date().getTime(),
    });
  } catch (error) {
    console.log(error);
  }
};
