import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { firebaseDB } from "../../firebase";

const handleAddNewInfo = async ({
  data,
  uidPath,
  message,
  whoWritteMessage,
}) => {
  await setDoc(
    doc(firebaseDB, "usersChats", uidPath),
    {
      [data?.username]: {
        createMessage: serverTimestamp(),
        isView: false,
        lastMessage: message,
        uid: data?.uid,
        whoWritteMessage,
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
      deleteForMy: [],
      isView: false,
      message,
      uid: infoUserActive?.uid,
      uidOtherUser: userSelected?.uid,
      username: infoUserActive?.username,
      usernameOtherUser: userSelected?.username,
    });

    await handleAddNewInfo({
      data: infoUserActive,
      message,
      uidPath: userSelected?.uid,
      whoWritteMessage: infoUserActive?.uid,
    });

    await handleAddNewInfo({
      data: userSelected,
      message,
      uidPath: infoUserActive?.uid,
      whoWritteMessage: infoUserActive?.uid,
    });

    navigate("/chat");
  } catch (error) {
    console.log(error);
  }
};
