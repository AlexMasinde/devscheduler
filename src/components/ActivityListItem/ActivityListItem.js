import React from "react";

import ActivityListItemStyles from "./ActivityListItem.module.css";

import trash from "../../icons/trash.svg";
import edit from "../../icons/edit.svg";

export default function ActivityListItem({ activity }) {
  return (
    <div className={ActivityListItemStyles.listItem}>
      <div className={ActivityListItemStyles.text}>
        <label className={ActivityListItemStyles.checkboxcontainer}>
          <input type="checkbox" />
          <span className={ActivityListItemStyles.checkmark}></span>
        </label>
        <p>{activity}</p>
      </div>
      <div className={ActivityListItemStyles.icons}>
        <img
          className={ActivityListItemStyles.lefticon}
          src={edit}
          alt="edit"
        />
        <img src={trash} alt="delete" />
      </div>
    </div>
  );
}
