import React, { useEffect, useState } from "react";
import shortid from "shortid";

import { database } from "../../firebase";

import { useActivities } from "../../contexts/activitiesContext";

import ActivityListItem from "../ActivityListItem/ActivityListItem";

import ActivitiiesListStyles from "./ActivitiiesList.module.css";

export default function ActivitiiesList() {
  const { activities, dispatch } = useActivities();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getActivities() {
      try {
        setLoading(true);
        const rawActivities = await database.activities.get();
        const formattedActivities = rawActivities.docs.map((rawActivity) => {
          return database.formatDocument(rawActivity);
        });
        dispatch({ type: "set-activities", payload: formattedActivities });
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    }
    getActivities();
  }, [dispatch]);

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
