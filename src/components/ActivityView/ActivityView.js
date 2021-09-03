import React, { useEffect, useState } from "react";
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
import { database } from "../../firebase";

export default function ActivityView() {
  const { setAddingTask } = useAddTaskModalContext();
  const { setAdding } = useModal();
  const { selectedActivity, activityTasks, dispatch } = useActivities();
  const { setItemToDelete, setDeleting } = useDeleteModal();
  const [loadingTasks, setLoadingtasks] = useState(false);

  useEffect(() => {
    async function getActivityTasks() {
      try {
        setLoadingtasks(true);
        const results = await database.tasks
          .where("activityId", "==", selectedActivity.id)
          .orderBy("deadline", "desc")
          .get();
        const formattedResults = results.docs.map((doc) => {
          return database.formatDocument(doc);
        });
        dispatch({
          type: "set-tasks",
          payload: formattedResults,
        });
        setLoadingtasks(false);
      } catch (err) {
        setLoadingtasks(false);
        console.log(err);
      }
    }
    getActivityTasks();
  }, [selectedActivity, dispatch]);

  function deleteActivity() {
    const toDelete = {
      ...selectedActivity,
      type: "activity",
    };
    setItemToDelete(toDelete);
    setDeleting(true);
  }

  function editActivity() {
    dispatch({
      type: "set-editing-item",
      payload: {
        edit: true,
        item: selectedActivity,
      },
    });
    setAdding(true);
  }

  function handleModal() {
    setAddingTask(true);
  }

  return (
    <div className={ActivityViewStyles.container}>
      <div className={ActivityViewStyles.header}>
        <p>{selectedActivity.name}</p>
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
      {loadingTasks && (
        <div className={ActivityViewStyles.info}>
          <p>Fetching Tasks...</p>
        </div>
      )}
      {!loadingTasks && activityTasks.length > 0 && (
        <div>
          {activityTasks.map((task) => {
            return <TaskListItem key={shortid.generate()} task={task} />;
          })}
        </div>
      )}
      {!loadingTasks && activityTasks.length === 0 && (
        <div className={ActivityViewStyles.info}>
          <p>No tasks for this activity. You can add them below</p>
        </div>
      )}
      <div onClick={() => handleModal()} className={ActivityViewStyles.add}>
        <img src={add} alt="Add task" />
        <span>Add Task</span>
      </div>
    </div>
  );
}
