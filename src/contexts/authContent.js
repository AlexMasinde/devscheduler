import React, { createContext, useContext, useEffect, useState } from "react";
import { isElement } from "react-dom/test-utils";
import { auth } from "../firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signUp(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function signIn(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function signOut() {
    return auth.signOut();
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    signIn,
    signOut,
    signUp,
    currentUser,
  };
  return (
    <>
      {loading && <div>Loading...</div>}
      {!loading && (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
      )}
    </>
  );
}
