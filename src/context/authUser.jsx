import { createContext, useEffect, useState } from "react";

import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth, firebaseDB } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

export const AuthUserContext = createContext();

export const AuthUserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [userActive, setUserActive] = useState(null);
  const [startLoading, setStartLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        const { displayName, email, uid } = user;

        setUserActive({ displayName, email, uid });

        setIsLoggedIn(true);
        setStartLoading(false);
      } else {
        setIsLoggedIn(false);
        setStartLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    const unSuscribed = onSnapshot(collection(firebaseDB, "users"), (users) => {
      const arrayUsers = users.docs.map((doc) => {
        return {
          idDoc: doc.id,
          ...doc.data(),
        };
      });

      setUsers([...arrayUsers]);
    });

    return () => unSuscribed();
  }, []);

  const searchUserByUsername = (username) => {
    return users?.find((user) => user.username === username);
  };

  const userActiveComplete = users?.find(
    (user) => user.uid === userActive?.uid
  );

  const providerState = {
    users,
    isLoggedIn,
    searchUserByUsername,
    startLoading,
    userActive,
    userActiveComplete,
  };

  return (
    <AuthUserContext.Provider value={providerState}>
      {children}
    </AuthUserContext.Provider>
  );
};
