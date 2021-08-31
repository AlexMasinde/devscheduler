import React, { createContext, useContext, useReducer } from "react";

const ActivitiesContext = createContext();

export function useActivities() {
  return useContext(ActivitiesContext);
}

function reducer(state, action) {
  switch (action.type) {
    case "select-activity":
      return { ...state, selectedActivity: action.payload };
    case "set-activities":
      return { ...state, activities: action.payload };
    case "set-tasks":
      return { ...state, activityTasks: action.payload };
    case "set-editing-item": {
      return { ...state, editingItem: action.payload };
    }
    default:
      return state;
  }
}

const initialState = {
  selectedActivity: null,
  activities: [],
  activityTasks: [],
  category: null,
  editingItem: {
    edit: false,
    item: {},
  },
};

export function ActivitiesContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = {
    selectedActivity: state.selectedActivity,
    activities: state.activities,
    activityTasks: state.activityTasks,
    category: state.category,
    editingItem: state.editingItem,
    dispatch,
  };

  return (
    <ActivitiesContext.Provider value={value}>
      {children}
    </ActivitiesContext.Provider>
  );
}
