import React from "react";
import shortid from "shortid";

import { useActivities } from "../../contexts/activitiesContext";

import ActivityListItem from "../ActivityListItem/ActivityListItem";

import ActivitiiesListStyles from "./ActivitiiesList.module.css";

export default function ActivitiiesList() {
  const { activities, activeCategory } = useActivities();
  const title =
    activeCategory === "Home" ? "Latest Activities" : activeCategory;
  const renderActivities =
    activeCategory === "Home"
      ? activities.slice(0, 2)
      : activities.filter((activity) => activity.category === activeCategory);

  return (
    <div className={ActivitiiesListStyles.container}>
      <div className={ActivitiiesListStyles.title}>
        <h1>{title}</h1>
      </div>
      <div className={ActivitiiesListStyles.list}>
        {renderActivities.map((activity) => {
          return (
            <ActivityListItem activity={activity} key={shortid.generate()} />
          );
        })}
      </div>
    </div>
  );
}
