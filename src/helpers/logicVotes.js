import { doc, updateDoc } from "firebase/firestore";
import { firebaseDB } from "../firebase";

export const logicVotes = async (data, typeVotes, uid, pathBDSave) => {
  const newValues = {
    ...data,
    [typeVotes]: [...data[typeVotes], uid],
  };

  if (data[typeVotes].includes(uid)) {
    newValues[typeVotes] = newValues[typeVotes].filter((vote) => vote !== uid);
  }

  if (data.votesBad.includes(uid) && typeVotes === "votesGood") {
    newValues.votesBad = newValues.votesBad.filter((good) => good !== uid);

    newValues.votesGood = [...data.votesGood, uid];
  }

  if (data.votesGood.includes(uid) && typeVotes === "votesBad") {
    newValues.votesGood = newValues.votesGood.filter((bad) => bad !== uid);

    newValues.votesBad = [...data.votesBad, uid];
  }

  const docRef = doc(firebaseDB, pathBDSave);

  try {
    await updateDoc(docRef, {
      votesGood: newValues.votesGood,
      votesBad: newValues.votesBad,
    });
  } catch (error) {
    console.log(error);
  }
};
