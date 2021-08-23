import React from "react";

import { useModal } from "../../contexts/modalContext";
import { useActivities } from "../../contexts/activitiesContext";

import ActivitiiesList from "../../components/ActivitiesList/ActivitiiesList";
import DashboardNav from "../../components/DashboardNav/DashboardNav";
import PendingTasks from "../../components/presentationcomponents/PendingTasks/PendingTasks";
import AddActivityModal from "../../components/AddActivityModal/AddActivityModal";
import ActivityView from "../../components/ActivityView/ActivityView";

import ActivitiesStyles from "./Activities.module.css";

export default function Activities() {
  const { selectedActivity } = useActivities();
  const { mounted, adding } = useModal();
  const closingModal = adding ? "" : ActivitiesStyles.modalout;

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
        <div className={`${ActivitiesStyles.modal} ${closingModal}`}>
          <AddActivityModal />
        </div>
      )}
    </div>
  );
}
