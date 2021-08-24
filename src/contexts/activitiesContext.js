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
  }
}

const initialState = {
  selectedActivity: null,
  activities: [],
  activityTasks: [],
  category: null,
};

export default function ActivitiesContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = {
    selectedActivity: state.selectedActivity,
    activities: state.activities,
    activityTasks: state.activityTasks,
    category: state.category,
    dispatch,
  };

  return (
    <ActivitiesContext.Provider value={value}>
      {children}
    </ActivitiesContext.Provider>
  );
}
