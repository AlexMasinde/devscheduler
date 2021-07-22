import React from "react";

import PendingTasksCounterStyles from "./PendingTasksCounter.module.css";

export default function PendingTasksCounter({ count }) {
  return (
    <div className={PendingTasksCounterStyles.counter}>
      <p>{count}</p>
    </div>
  );
}
