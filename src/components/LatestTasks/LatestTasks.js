import React from "react";
import shortid from "shortid";
import { useActivities } from "../../contexts/activitiesContext";
import Loading from "../Loading/Loading";

import TaskListItem from "../TaskListItem/TaskListItem";

import LatesTasksStyles from "./LatestTasks.module.css";

export default function LatestTasks() {
  const { tasks, loadingData } = useActivities();
  const latestTasks = tasks.slice(0, 4);
  return (
    <div>
      <div className={LatesTasksStyles.title}>
        <h1>Latest Tasks</h1>
      </div>
      {loadingData && (
        <div>
          <Loading />
        </div>
      )}
      {!loadingData && (
        <div>
          {latestTasks &&
            latestTasks.map((task) => {
              return <TaskListItem task={task} key={shortid.generate()} />;
            })}
        </div>
      )}
      {!loadingData && latestTasks.length === 0 && (
        <div className={LatesTasksStyles.message}>
          <p>You do not have any tasks</p>
        </div>
      )}
    </div>
  );
}
