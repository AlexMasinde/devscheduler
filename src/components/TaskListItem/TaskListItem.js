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
      // console.log(err);
    }
  }

  function handleTaskEdit() {
    dispatch({
      type: "SET_EDITING_ITEM",
      payload: {
        edit: true,
        item: task,
      },
    });
    setAddingTask(true);
  }

  return (
    <div
      data-testid="task-list-item"
      className={`${TaskListItemStyles.listItem} ${loadingClass}`}
    >
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
            alt="edit task"
          />
        )}
        <img onClick={() => handleTaskDelete()} src={trash} alt="delete task" />
      </div>
    </div>
  );
}
