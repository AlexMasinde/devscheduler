import React from "react";

import PendingTasksStyles from "./PendingTasks.module.css";

import PendingTasksCounter from "../PendingTasksCounter/PendingTasksCounter";

export default function PendingTasks() {
  const countOne = "113";
  const countTwo = "97";
  const countThree = "14";
  const titleOne = "Projects";
  const titleTwo = "Courses";
  const titleThree = "Readings";

  return (
    <div className={PendingTasksStyles.container}>
      <p>Pending Tasks</p>
      <div className={PendingTasksStyles.counters}>
        <div>
          <PendingTasksCounter title={titleOne} count={countOne} />
        </div>
        <div>
          <PendingTasksCounter title={titleTwo} count={countTwo} />
        </div>
        <div>
          <PendingTasksCounter title={titleThree} count={countThree} />
        </div>
      </div>
    </div>
  );
}
