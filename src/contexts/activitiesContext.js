import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";
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
      return { ...state, tasks: action.payload };
    case "SET_EDITING_ITEM": {
      return { ...state, editingItem: action.payload };
    }
    case "LOADING":
      return { ...state, loading: action.payload };
    case "SET_ACTIVE_CATEGORY":
      return { ...state, activeCategory: action.payload };
    case "SET_LATEST_TASKS":
      return { ...state, latestTasks: action.payload };
    default:
      return state;
  }
}

const initialState = {
  selectedActivity: null,
  activities: [],
  tasks: [],
  activeCategory: "Home",
  editingItem: {
    edit: false,
    item: {},
  },
  latestTasks: [],
};

export function ActivitiesContextProvider({ children, testActivities }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loadingData, setLoadingData] = useState(false);
  const [dataError, setDataError] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setLoadingData(true);
        const rawActivities = await database.activities
          .orderBy("createdAt", "desc")
          .get();
        const rawTasks = await database.tasks
          .orderBy("createdAt", "desc")
          .get();
        const formattedtasks = rawTasks.docs.map((task) => {
          return database.formatDocument(task);
        });
        const formattedActivities = rawActivities.docs.map((rawActivity) => {
          return database.formatDocument(rawActivity);
        });

        dispatch({ type: "SET_ACTIVITIES", payload: formattedActivities });
        dispatch({ type: "SET_TASKS", payload: formattedtasks });
        setLoadingData(false);
      } catch (err) {
        console.log(err);
        setDataError(true);
        setLoadingData(false);
      }
    }
    getData();
  }, [dispatch]);

  const activities = testActivities ? testActivities : state.activities;

  const value = {
    selectedActivity: state.selectedActivity,
    activities,
    tasks: state.tasks,
    activeCategory: state.activeCategory,
    editingItem: state.editingItem,
    activitiesLoading: state.activitiesLoading,
    latestTasks: state.latestTasks,
    loadingData,
    dataError,
    dispatch,
  };

  return (
    <ActivitiesContext.Provider value={value}>
      {children}
    </ActivitiesContext.Provider>
  );
}
