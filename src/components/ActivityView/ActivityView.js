import React from "react";
import shortid from "shortid";

import { useActivities } from "../../contexts/activitiesContext";
import { useAddTaskModalContext } from "../../contexts/addtaskModalContext";
import { useDeleteModal } from "../../contexts/deleteModalContext";
import { useModal } from "../../contexts/modalContext";

import TaskListItem from "../TaskListItem/TaskListItem";

import edit from "../../icons/edit.svg";
import trash from "../../icons/trash.svg";
import add from "../../icons/add.svg";

import ActivityViewStyles from "./ActivityView.module.css";

export default function ActivityView() {
  const { setAddingTask } = useAddTaskModalContext();
  const { setAdding } = useModal();
  const { selectedActivity, tasks, dataLoading, dispatch } = useActivities();
  const { setItemToDelete, setDeleting } = useDeleteModal();

  const activityTasks = tasks.filter(
    (task) => task.activityId === selectedActivity.id
  );

  //delete activity modal
  function deleteActivity() {
    const toDelete = {
      ...selectedActivity,
      type: "activity",
    };
    setItemToDelete(toDelete);
    setDeleting(true);
  }

  //Edit activity modal
  function editActivity() {
    dispatch({
      type: "SET_EDITING_ITEM",
      payload: {
        edit: true,
        item: selectedActivity,
      },
    });
    setAdding(true);
  }

  //Add tasks modal
  function handleModal() {
    setAddingTask(true);
  }

  return (
    <div className={ActivityViewStyles.container}>
      <div className={ActivityViewStyles.header}>
        <h1>{selectedActivity.name}</h1>
        <div className={ActivityViewStyles.headercontent}>
          <div
            className={ActivityViewStyles.headericons}
            onClick={() => editActivity()}
          >
            <img src={edit} alt="edit activity" />
            <p>Edit</p>
          </div>
          <div
            onClick={() => deleteActivity()}
            className={ActivityViewStyles.headericons}
          >
            <img src={trash} alt="delete activity" />
            <p>Delete</p>
          </div>
        </div>
      </div>
      {dataLoading && (
        <div className={ActivityViewStyles.info}>
          <p>Fetching Tasks...</p>
        </div>
      )}
      {!dataLoading && activityTasks.length > 0 && (
        <div>
          {activityTasks.map((task) => {
            return <TaskListItem key={shortid.generate()} task={task} />;
          })}
        </div>
      )}
      {!dataLoading && activityTasks.length === 0 && (
        <div className={ActivityViewStyles.info}>
          <p>No tasks for this activity. You can add them below</p>
        </div>
      )}
      <div onClick={() => handleModal()} className={ActivityViewStyles.add}>
        <img src={add} alt="add task" />
        <span>Add Task</span>
      </div>
    </div>
  );
}
