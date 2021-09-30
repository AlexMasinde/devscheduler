import React from "react";
import { useActivities } from "../../contexts/activitiesContext";

import TaskListItem from "../TaskListItem/TaskListItem";

import LatesTasksStyles from "./LatestTasks.module.css";

export default function LatestTasks() {
  const { tasks, dataLoading } = useActivities();
  const latestTasks = tasks.slice(0, 4);
  return (
    <div>
      <div className={LatesTasksStyles.title}>
        <h1>Latest Tasks</h1>
      </div>
      <div>
        {dataLoading && <p>Loading..</p>}
        {latestTasks &&
          latestTasks.map((task) => {
            return <TaskListItem task={task} />;
          })}
      </div>
    </div>
  );
}
