import React from "react";

import { useActivities } from "../../contexts/activitiesContext";

import ActivityListItemStyles from "./ActivityListItem.module.css";

export default function ActivityListItem({ activity }) {
  const { dispatch, selectedActivity } = useActivities();

  function selectActivity() {
    if (selectedActivity && selectedActivity.id === activity.id) {
      dispatch({ type: "select-activity", payload: null });
    } else {
      dispatch({ type: "select-activity", payload: activity });
    }
  }

  return (
    <div onClick={selectActivity} className={ActivityListItemStyles.listItem}>
      <p>{activity.name}</p>
    </div>
  );
}
