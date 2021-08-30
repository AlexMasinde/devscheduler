import React from "react";

import { useModal } from "../../contexts/modalContext";
import { useActivities } from "../../contexts/activitiesContext";
import { useAddTaskModalContext } from "../../contexts/addtaskModalContext";

import ActivitiiesList from "../../components/ActivitiesList/ActivitiiesList";
import DashboardNav from "../../components/DashboardNav/DashboardNav";
import PendingTasks from "../../components/presentationcomponents/PendingTasks/PendingTasks";
import AddActivityModal from "../../components/AddActivityModal/AddActivityModal";
import ActivityView from "../../components/ActivityView/ActivityView";
import AddTaskModal from "../../components/AddTaskModal/AddTaskModal";

import ActivitiesStyles from "./Activities.module.css";

export default function Activities() {
  const { selectedActivity } = useActivities();
  const { mounted, adding, setAdding } = useModal();
  const { mountedTaskModal, addingTask, setAddingTask } =
    useAddTaskModalContext();
  const closingModal = adding || addingTask ? "" : ActivitiesStyles.modalout;
  const openingModalCanvas =
    adding || addingTask ? ActivitiesStyles.canvasin : "";

  function closeModal() {
    adding ? setAdding(false) : setAddingTask(false);
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
          ></div>
          <div
            className={`${ActivitiesStyles.modal} ${openingModalCanvas} ${closingModal}`}
          >
            <AddTaskModal />
          </div>
        </>
      )}
    </div>
  );
}
