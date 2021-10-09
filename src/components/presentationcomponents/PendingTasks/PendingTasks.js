import React from "react";

import PendingTasksStyles from "./PendingTasks.module.css";

import PendingTasksCounter from "../PendingTasksCounter/PendingTasksCounter";
import { useActivities } from "../../../contexts/activitiesContext";

export default function PendingTasks() {
  const { tasks } = useActivities();

  const projectsPending = tasks.filter(
    (task) => task.category === "Projects" && !task.complete
  );

  const coursesPending = tasks.filter(
    (task) => task.category === "Courses" && !task.complete
  );

  const readingsPending = tasks.filter(
    (task) => task.category === "Readings" && !task.complete
  );

  return (
    <div className={PendingTasksStyles.container}>
      {console.log(tasks)}
      <h1>Pending Tasks</h1>
      <div className={PendingTasksStyles.counters}>
        <div>
          <PendingTasksCounter
            title="Projects"
            count={projectsPending.length}
          />
        </div>
        <div>
          <PendingTasksCounter title="Courses" count={coursesPending.length} />
        </div>
        <div>
          <PendingTasksCounter
            title="Readings"
            count={readingsPending.length}
          />
        </div>
      </div>
    </div>
  );
}
