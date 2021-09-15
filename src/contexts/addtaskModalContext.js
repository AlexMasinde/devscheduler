import React, { createContext, useContext, useEffect, useState } from "react";

export const AddTaskModalContext = createContext();

export function useAddTaskModalContext() {
  return useContext(AddTaskModalContext);
}

export function AddTaskModalContextProvider({ children }) {
  const [addingTask, setAddingTask] = useState(false);
  const [mountedTaskModal, setMountedTaskModal] = useState(false);

  useEffect(() => {
    let timeoutId;
    if (addingTask && !mountedTaskModal) {
      setMountedTaskModal(true);
    } else if (!addingTask && mountedTaskModal) {
      timeoutId = setTimeout(() => {
        setMountedTaskModal(false);
      }, 500);
    }

    return () => clearTimeout(timeoutId);
  }, [addingTask, mountedTaskModal]);

  const value = {
    addingTask,
    setAddingTask,
    mountedTaskModal,
  };
  return (
    <AddTaskModalContext.Provider value={value}>
      {children}
    </AddTaskModalContext.Provider>
  );
}
