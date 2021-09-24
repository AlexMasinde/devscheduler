import React from "react";

import ActivitiesList from "../ActivitiesList/ActivitiiesList";
import LatestTasks from "../LatestTasks/LatestTasks";

export default function LatestContainer() {
  return (
    <div>
      <div>
        <LatestTasks />
      </div>
      <div>
        <ActivitiesList />
      </div>
    </div>
  );
}
