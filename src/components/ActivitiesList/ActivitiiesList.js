import React, { useEffect, useState } from "react";
import shortid from "shortid";

import { database } from "../../firebase";

import { useActivities } from "../../contexts/activitiesContext";

import ActivityListItem from "../ActivityListItem/ActivityListItem";

import ActivitiiesListStyles from "./ActivitiiesList.module.css";

export default function ActivitiiesList() {
  const { activities, dispatch } = useActivities();

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
