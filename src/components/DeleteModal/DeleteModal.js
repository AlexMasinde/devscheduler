import React, { useState } from "react";

import { database } from "../../firebase";

import { useDeleteModal } from "../../contexts/deleteModalContext";
import { useActivities } from "../../contexts/activitiesContext";

import Button from "../presentationcomponents/Button/Button";
import CloseIcon from "../CloseIcon/CloseIcon";

import DeleteModalStyles from "./DeleteModal.module.css";

export default function DeleteModal({ item }) {
  const [loading, setLoading] = useState(false);
  const { setDeleting } = useDeleteModal();
  const { dispatch, activityTasks, activities } = useActivities();

  function closeModal() {
    setDeleting(false);
  }

  async function deleteActivity() {
    try {
      setLoading(true);
      await database.activities.doc(item.id).delete();
      if (activityTasks.length > 0) {
        activityTasks.forEach(async (activityTask) => {
          await database.tasks.doc(activityTask.id).delete();
        });
      }
      const newActivities = activities.filter(
        (activity) => activity.id !== item.id
      );
      dispatch({
        type: "SET_ACTIVITIES",
        payload: newActivities,
      });
      setLoading(false);
      setDeleting(false);
      dispatch({
        type: "SELECT_ACTIVITY",
        payload: null,
      });
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  async function deleteTask() {
    try {
      setLoading(true);
      await database.tasks.doc(item.id).delete();
      const newActivities = activityTasks.filter(
        (activityTask) => activityTask.id !== item.id
      );
      dispatch({
        type: "SET_TASKS",
        payload: newActivities,
      });
      setLoading(false);
      setDeleting(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  function handleDelete() {
    if (item.type === "task") {
      deleteTask();
    }

    if (item.type === "activity") {
      deleteActivity();
    }
  }

  return (
    <div className={DeleteModalStyles.container}>
      <div className={DeleteModalStyles.header}>
        <h1>Confirm Deletion</h1>
        <div
          className={DeleteModalStyles.closeIcon}
          onClick={() => closeModal()}
        >
          <CloseIcon />
        </div>
      </div>
      <div className={DeleteModalStyles.text}>
        <p>
          Delete <span>{item.name}</span>?
        </p>
      </div>
      <div className={DeleteModalStyles.buttons}>
        <div className={DeleteModalStyles.cancel}>
          <Button text="Cancel" variant="light" onClick={() => closeModal()} />
        </div>

        <div>
          <Button
            text="Delete"
            variant="danger"
            loading={loading}
            onClick={() => handleDelete()}
          />
        </div>
      </div>
    </div>
  );
}
