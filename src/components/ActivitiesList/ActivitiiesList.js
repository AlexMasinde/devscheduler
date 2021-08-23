import React, { useEffect, useState } from "react";
import shortid from "shortid";
import { database } from "../../firebase";

import ActivityListItem from "../ActivityListItem/ActivityListItem";

import ActivitiiesListStyles from "./ActivitiiesList.module.css";

export default function ActivitiiesList() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getActivities() {
      try {
        setLoading(true);
        const rawActivities = await database.projects.get();
        const formattedActivities = rawActivities.docs.map((rawActivity) => {
          return database.formatDocument(rawActivity);
        });
        setActivities(formattedActivities);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    }
    getActivities();
  }, []);

  return (
    <div className={ActivitiiesListStyles.container}>
      {console.log(activities)}
      <div className={ActivitiiesListStyles.title}>
        <h1>Projects</h1>
      </div>
      <div>
        {activities.map((activity) => {
          return (
            <ActivityListItem
              activity={activity.name}
              key={shortid.generate()}
            />
          );
        })}
      </div>
    </div>
  );
}
