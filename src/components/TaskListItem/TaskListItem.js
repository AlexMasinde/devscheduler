import React from "react";

import TaskListItemStyles from "./TaskListItem.module.css";

import trash from "../../icons/trash.svg";
import edit from "../../icons/edit.svg";

export default function TaskListItem({ task }) {
  return (
    <div className={TaskListItemStyles.listItem}>
      <div className={TaskListItemStyles.text}>
        <label className={TaskListItemStyles.checkboxcontainer}>
          <input type="checkbox" />
          <span className={TaskListItemStyles.checkmark}></span>
        </label>
        <p>{task.name}</p>
      </div>
      <div className={TaskListItemStyles.icons}>
        <img className={TaskListItemStyles.lefticon} src={edit} alt="edit" />
        <img src={trash} alt="delete" />
      </div>
    </div>
  );
}
