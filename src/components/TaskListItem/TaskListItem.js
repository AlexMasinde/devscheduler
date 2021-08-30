import React, { useState } from "react";

import TaskListItemStyles from "./TaskListItem.module.css";

import { useActivities } from "../../contexts/activitiesContext";
import { useAddTaskModalContext } from "../../contexts/addtaskModalContext";

import { database } from "../../firebase";

import trash from "../../icons/trash.svg";
import edit from "../../icons/edit.svg";

export default function TaskListItem({ task }) {
  const { activityTasks, dispatch } = useActivities();
  const { setAddingTask } = useAddTaskModalContext();
  const [loading, setLoading] = useState(false);

  async function handleTaskDelete() {
    try {
      setLoading(true);
      await database.tasks.doc(task.id).delete();
      const newActivities = activityTasks.filter(
        (activityTask) => activityTask.id !== task.id
      );
      dispatch({
        type: "delete-task",
        payload: newActivities,
      });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  function handleTaskEdit() {
    dispatch({
      type: "set-editing-task",
      payload: {
        edit: true,
        taskToEdit: task,
      },
    });
    setAddingTask(true);
  }

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
        <img
          onClick={() => handleTaskEdit()}
          className={TaskListItemStyles.lefticon}
          src={edit}
          alt="edit"
        />
        <img onClick={() => handleTaskDelete()} src={trash} alt="delete" />
      </div>
    </div>
  );
}
