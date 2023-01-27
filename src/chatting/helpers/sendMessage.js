import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { firebaseDB } from "../../firebase";

const handleAddNewInfo = async (data, uidPath, message) => {
  await setDoc(
    doc(firebaseDB, "usersChats", uidPath),
    {
      [data?.username]: {
        lastMessage: message,
        createMessage: serverTimestamp(),
        uid: data?.uid,
      },
    },
    { merge: true }
  );
};

export const onSendingMessage = async ({
  combinedUid,
  infoUserActive,
  message,
  navigate,
  userSelected,
}) => {
  try {
    const docRef = collection(firebaseDB, `messages/${combinedUid}/entry`);

    await addDoc(docRef, {
      createMessage: new Date().getTime(),
      message,
      uid: infoUserActive?.uid,
      username: infoUserActive?.username,
      deleteForMy: [],
      isView: false,
    });

    await handleAddNewInfo(infoUserActive, userSelected?.uid, message);
    await handleAddNewInfo(userSelected, infoUserActive?.uid, message);

    navigate("/chat");
  } catch (error) {
    console.log(error);
  }
};
