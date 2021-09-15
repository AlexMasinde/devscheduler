import React from "react";

import { useModal } from "../../contexts/modalContext";
import { useActivities } from "../../contexts/activitiesContext";
import { useAddTaskModalContext } from "../../contexts/addtaskModalContext";
import { useDeleteModal } from "../../contexts/deleteModalContext";

import ActivitiiesList from "../../components/ActivitiesList/ActivitiiesList";
import DashboardNav from "../../components/DashboardNav/DashboardNav";
import PendingTasks from "../../components/presentationcomponents/PendingTasks/PendingTasks";
import AddActivityModal from "../../components/AddActivityModal/AddActivityModal";
import ActivityView from "../../components/ActivityView/ActivityView";
import AddTaskModal from "../../components/AddTaskModal/AddTaskModal";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import UpcomingDeadline from "../../components/UpcomingDeadline/UpcomingDeadline";

import ActivitiesStyles from "./Activities.module.css";

export default function Activities() {
  const { selectedActivity, editingItem, dispatch } = useActivities();
  const { edit } = editingItem;
  const { mounted, adding, setAdding } = useModal();
  const { mountedTaskModal, addingTask, setAddingTask } =
    useAddTaskModalContext();
  const { deleting, setDeleting, deleteMounted, itemToDelete } =
    useDeleteModal();
  const closingModal =
    adding || addingTask || deleting ? "" : ActivitiesStyles.modalout;
  const openingModalCanvas =
    adding || addingTask || deleting ? ActivitiesStyles.canvasin : "";

  function closeModal() {
    if (edit) {
      dispatch({
        type: "SET_EDITING_ITEM",
        payload: {
          edit: false,
          item: {},
        },
      });
    }

    if (adding) {
      setAdding(false);
    }

    if (addingTask) {
      setAddingTask(false);
    }

    if (deleting) {
      setDeleting(false);
    }
  }

  return (
    <div>
      <div>
        <DashboardNav />
      </div>
      <div>
        <PendingTasks />
      </div>
      <div>
        <UpcomingDeadline />
      </div>
      <div>
        <ActivitiiesList />
      </div>
      {selectedActivity && (
        <div>
          <ActivityView />
        </div>
      )}
      {mounted && (
        <>
          <div
            onClick={() => closeModal()}
            className={`${ActivitiesStyles.modaldiv} ${openingModalCanvas} ${closingModal}`}
            data-testid="modal container"
          ></div>
          <div
            className={`${ActivitiesStyles.modal} ${openingModalCanvas} ${closingModal}`}
          >
            <AddActivityModal />
          </div>
        </>
      )}
      {mountedTaskModal && (
        <>
          <div
            onClick={() => closeModal()}
            className={`${ActivitiesStyles.modaldiv} ${openingModalCanvas} ${closingModal}`}
            data-testid="modal container"
          ></div>
          <div
            className={`${ActivitiesStyles.modal} ${openingModalCanvas} ${closingModal}`}
          >
            <AddTaskModal />
          </div>
        </>
      )}
      {deleteMounted && (
        <>
          <div
            onClick={() => closeModal()}
            className={`${ActivitiesStyles.modaldiv} ${openingModalCanvas} ${closingModal}`}
            data-testid="modal container"
          ></div>
          <div
            className={`${ActivitiesStyles.modal} ${openingModalCanvas} ${closingModal}`}
          >
            <DeleteModal item={itemToDelete} />
          </div>
        </>
      )}
    </div>
  );
}
