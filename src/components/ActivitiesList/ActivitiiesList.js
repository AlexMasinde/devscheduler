import React from "react";
import shortid from "shortid";
import ActivityListItem from "../ActivityListItem/ActivityListItem";

import ActivitiiesListStyles from "./ActivitiiesList.module.css";

export default function ActivitiiesList() {
  const activities = [
    "Play a Violin",
    "Eat some food",
    "Maintain shape at the gym",
    "Get to know others",
    "Read some books",
    "Norp is bad",
    "Go to school",
    "Cross the road",
  ];
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
