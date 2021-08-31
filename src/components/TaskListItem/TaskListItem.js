import React, { useState } from "react";

import TaskListItemStyles from "./TaskListItem.module.css";

import { useActivities } from "../../contexts/activitiesContext";
import { useAddTaskModalContext } from "../../contexts/addtaskModalContext";
import { useDeleteModal } from "../../contexts/deleteModalContext";

import { database } from "../../firebase";

import trash from "../../icons/trash.svg";
import edit from "../../icons/edit.svg";

export default function TaskListItem({ task }) {
  const { activityTasks, dispatch } = useActivities();
  const { setAddingTask } = useAddTaskModalContext();
  const [loading, setLoading] = useState(false);
  const { setDeleting, setItemToDelete } = useDeleteModal();
  const [complete, setComplete] = useState(task.complete);
  const loadingClass = loading ? TaskListItemStyles.loading : "";

  async function handleTaskDelete() {
    const toDelete = {
      ...task,
      type: "task",
    };
    setItemToDelete(toDelete);
    setDeleting(true);
  }

  async function completeTask() {
    if (loading) {
      return;
    }
    try {
      setLoading(true);
      await database.tasks.doc(task.id).update({
        complete: !complete,
      });
      const newComplete = !complete;
      setComplete(newComplete);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  function handleTaskEdit() {
    dispatch({
      type: "set-editing-item",
      payload: {
        edit: true,
        item: task,
      },
    });
    setAddingTask(true);
  }

  return (
    <div className={`${TaskListItemStyles.listItem} ${loadingClass}`}>
      {console.log(activityTasks)}
      <div onClick={() => completeTask()} className={TaskListItemStyles.text}>
        <label className={TaskListItemStyles.checkboxcontainer}>
          <input type="checkbox" checked={complete} readOnly />
          <span className={TaskListItemStyles.checkmark}></span>
        </label>
        <p className={complete ? TaskListItemStyles.complete : ""}>
          {task.name}
        </p>
      </div>
      <div className={TaskListItemStyles.icons}>
        {!complete && (
          <img
            onClick={() => handleTaskEdit()}
            className={TaskListItemStyles.lefticon}
            src={edit}
            alt="edit"
          />
        )}
        <img onClick={() => handleTaskDelete()} src={trash} alt="delete" />
      </div>
    </div>
  );
}
