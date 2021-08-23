import React, { useState } from "react";
import shortid from "shortid";

import TaskListItem from "../TaskListItem/TaskListItem";

import edit from "../../icons/edit.svg";
import trash from "../../icons/trash.svg";
import add from "../../icons/add.svg";

import ActivityViewStyles from "./ActivityView.module.css";

export default function ActivityView() {
  const [tasks, setTasks] = useState([]);

  return (
    <div className={ActivityViewStyles.container}>
      <div className={ActivityViewStyles.header}>
        <p>Get children from school</p>
        <div className={ActivityViewStyles.headercontent}>
          <div>
            <label className={ActivityViewStyles.checkboxcontainer}>
              <input type="checkbox" />
              <span className={ActivityViewStyles.checkmark}></span>
            </label>
            <p>Complete</p>
          </div>
          <div className={ActivityViewStyles.headericons}>
            <img src={edit} alt="edit" />
            <p>Edit</p>
          </div>
          <div className={ActivityViewStyles.headericons}>
            <img src={trash} alt="trash" />
            <p>Delete</p>
          </div>
        </div>
      </div>
      <div>
        {tasks.map((task) => {
          return <TaskListItem key={shortid.generate()} task={task} />;
        })}
      </div>
      <div className={ActivityViewStyles.add}>
        <img src={add} alt="Add task" />
        <span>Add Task</span>
      </div>
    </div>
  );
}
