import React, { createContext, useContext, useReducer } from "react";

export const ActivitiesContext = createContext();

export function useActivities() {
  return useContext(ActivitiesContext);
}

function reducer(state, action) {
  switch (action.type) {
    case "SELECT_ACTIVITY":
      return { ...state, selectedActivity: action.payload };
    case "SET_ACTIVITIES":
      return { ...state, activities: action.payload };
    case "SET_TASKS":
      return { ...state, activityTasks: action.payload };
    case "SET_EDITING_ITEM": {
      return { ...state, editingItem: action.payload };
    }
    case "ACTIVITIES_LOADING":
      return { ...state, activitiesLoading: action.payload };
    default:
      return state;
  }
}

const initialState = {
  selectedActivity: null,
  activities: [],
  activityTasks: [],
  category: null,
  activitiesLoading: false,
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
    activitiesLoading: state.activitiesLoading,
    dispatch,
  };

  return (
    <ActivitiesContext.Provider value={value}>
      {children}
    </ActivitiesContext.Provider>
  );
}
