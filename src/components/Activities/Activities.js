import React from "react";

import ActivitiiesList from "../ActivitiesList/ActivitiiesList";
import DashboardNav from "../DashboardNav/DashboardNav";
import PendingTasks from "../presentationcomponents/PendingTasks/PendingTasks";

import ActivitiesStyles from "./Activities.module.css";

export default function Activities() {
  return (
    <div>
      <div>
        <DashboardNav />
      </div>
      <div>
        <PendingTasks />
      </div>
      <div>
        <ActivitiiesList />
      </div>
    </div>
  );
}
