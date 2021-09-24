import React from "react";

import ActivitiesList from "../ActivitiesList/ActivitiiesList";
import LatestTasks from "../LatestTasks/LatestTasks";

import LatestContainerStyles from "./LatestContainer.module.css";

export default function LatestContainer() {
  return (
    <div>
      <div className={LatestContainerStyles.tasks}>
        <LatestTasks />
      </div>
      <div className={LatestContainerStyles.activities}>
        <ActivitiesList />
      </div>
    </div>
  );
}
