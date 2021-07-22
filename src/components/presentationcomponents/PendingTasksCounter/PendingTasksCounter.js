import React from "react";

import PendingTasksCounterStyles from "./PendingTasksCounter.module.css";

export default function PendingTasksCounter({ count, title }) {
  return (
    <div className={PendingTasksCounterStyles.container}>
      <div className={PendingTasksCounterStyles.title}>
        <p>{title}</p>
      </div>
      <div className={PendingTasksCounterStyles.counter}>
        <p>{count}</p>
      </div>
    </div>
  );
}
