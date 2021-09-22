import React from "react";
import shortid from "shortid";

import { useActivities } from "../../contexts/activitiesContext";

import ActivityListItem from "../ActivityListItem/ActivityListItem";

import ActivitiiesListStyles from "./ActivitiiesList.module.css";

export default function ActivitiiesList() {
  const { activities } = useActivities();

  return (
    <div className={ActivitiiesListStyles.container}>
      <div className={ActivitiiesListStyles.title}>
        <h1>Projects</h1>
      </div>
      <div>
        {activities.map((activity) => {
          return (
            <ActivityListItem activity={activity} key={shortid.generate()} />
          );
        })}
      </div>
    </div>
  );
}
