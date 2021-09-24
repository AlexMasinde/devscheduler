import React, { useEffect, useState } from "react";
import { useActivities } from "../../contexts/activitiesContext";
import { database } from "../../firebase";

import TaskListItem from "../TaskListItem/TaskListItem";

import LatesTasksStyles from "./LatestTasks.module.css";

export default function LatestTasks() {
  const { latestTasks, dispatch } = useActivities();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = database.tasks
      .orderBy("createdAt", "desc")
      .limit(4)
      .onSnapshot(
        (documentSnapshot) => {
          const formattedTasks = [];
          documentSnapshot.docs.forEach((doc) => {
            formattedTasks.push(database.formatDocument(doc));
          });
          dispatch({
            type: "SET_LATEST_TASKS",
            payload: formattedTasks,
          });
          console.log(formattedTasks);
          setLoading(false);
        },
        (error) => {
          setLoading(false);
          console.log(error);
        }
      );
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <div>
      <div className={LatesTasksStyles.title}>
        <h1>Latest Tasks</h1>
      </div>
      <div>
        {loading && <p>Loading..</p>}
        {latestTasks &&
          latestTasks.map((task) => {
            return <TaskListItem task={task} />;
          })}
      </div>
    </div>
  );
}
