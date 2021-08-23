import React, { createContext, useContext, useEffect, useState } from "react";

const ModalContext = createContext();

export function useModal() {
  return useContext(ModalContext);
}

export function ModalContextProvider({ children }) {
  const [adding, setAdding] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let timeoutId;
    if (adding && !mounted) {
      setMounted(true);
    } else if (!adding && mounted) {
      timeoutId = setTimeout(() => setMounted(false), 490);
    }
    return () => clearTimeout(timeoutId);
  }, [adding, mounted]);

  const value = { adding, setAdding, mounted };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}
