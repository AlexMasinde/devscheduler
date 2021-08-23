import React from "react";

import ActivityListItemStyles from "./ActivityListItem.module.css";

export default function ActivityListItem({ activity }) {
  return (
    <div className={ActivityListItemStyles.listItem}>
      <p>{activity}</p>
    </div>
  );
}
