import React, { createContext, useContext, useReducer, useEffect } from "react";
import { database } from "../firebase";

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

export function ActivitiesContextProvider({ children, testActivities }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function getActivities() {
      try {
        dispatch({
          type: "ACTIVITIES_LOADING",
          payload: true,
        });
        const rawActivities = await database.activities.get();
        const formattedActivities = rawActivities.docs.map((rawActivity) => {
          return database.formatDocument(rawActivity);
        });
        dispatch({ type: "SET_ACTIVITIES", payload: formattedActivities });
        dispatch({
          type: "ACTIVITIES_LOADING",
          payload: false,
        });
      } catch (err) {
        dispatch({
          type: "ACTIVITIES_LOADING",
          payload: false,
        });
      }
    }
    getActivities();
  }, [dispatch]);

  const activities = testActivities ? testActivities : state.activities;
  const value = {
    selectedActivity: state.selectedActivity,
    activities,
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
