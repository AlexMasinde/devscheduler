import React, { createContext, useContext, useEffect, useState } from "react";

const DeleteModalContext = createContext();

export function useDeleteModal() {
  return useContext(DeleteModalContext);
}

export function DeleteModalContextProvider({ children }) {
  const [deleting, setDeleting] = useState(false);
  const [deleteMounted, setDeleteMounted] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState({});

  useEffect(() => {
    let timeoutId;
    if (deleting && !deleteMounted) {
      setDeleteMounted(true);
    } else if (!deleting && deleteMounted) {
      timeoutId = setTimeout(() => setDeleteMounted(false), 500);
    }
    return () => clearTimeout(timeoutId);
  }, [deleting, deleteMounted]);

  const value = {
    deleting,
    setDeleting,
    deleteMounted,
    setTaskToDelete,
    taskToDelete,
  };

  return (
    <DeleteModalContext.Provider value={value}>
      {children}
    </DeleteModalContext.Provider>
  );
}
