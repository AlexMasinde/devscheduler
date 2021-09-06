import React from "react";

import { useActivities } from "../../contexts/activitiesContext";

import ActivityListItemStyles from "./ActivityListItem.module.css";

export default function ActivityListItem({ activity }) {
  const { dispatch, selectedActivity } = useActivities();

  function selectActivity() {
    if (selectedActivity && selectedActivity.id === activity.id) {
      dispatch({ type: "SELECT_ACTIVITY", payload: null });
    } else {
      dispatch({ type: "SELECT_ACTIVITY", payload: activity });
    }
  }

  return (
    <div onClick={selectActivity} className={ActivityListItemStyles.listItem}>
      <p>{activity.name}</p>
    </div>
  );
}
