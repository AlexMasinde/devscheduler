import React, { useState } from "react";

import { database } from "../../firebase";

import { useDeleteModal } from "../../contexts/deleteModalContext";
import { useActivities } from "../../contexts/activitiesContext";

import Button from "../presentationcomponents/Button/Button";
import CloseIcon from "../CloseIcon/CloseIcon";

import DeleteModalStyles from "./DeleteModal.module.css";

export default function DeleteModal({ task }) {
  const [loading, setLoading] = useState(false);
  const { setDeleting } = useDeleteModal();
  const { dispatch, activityTasks } = useActivities();

  function closeModal() {
    setDeleting(false);
  }

  async function handleDelete() {
    try {
      setLoading(true);
      await database.tasks.doc(task.id).delete();
      const newActivities = activityTasks.filter(
        (activityTask) => activityTask.id !== task.id
      );
      dispatch({
        type: "set-tasks",
        payload: newActivities,
      });
      setLoading(false);
      setDeleting(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
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
          Delete <span>{task.name}</span>?
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
