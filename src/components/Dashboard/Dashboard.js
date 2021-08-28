import React from "react";

import { useModal } from "../../contexts/modalContext";

import AddActivityModal from "../AddActivityModal/AddActivityModal";
import DashboardNav from "../DashboardNav/DashboardNav";

import DashboardStyles from "./Dashboard.module.css";

export default function Dashboard() {
  const { adding, setAdding, mounted } = useModal();
  const closingModal = adding ? "" : DashboardStyles.modalout;

  return (
    <div>
      <div>
        <DashboardNav modal={{ adding, setAdding }} />
      </div>
      {mounted && (
        <div className={`${DashboardStyles.modal} ${closingModal}`}>
          <AddActivityModal />
        </div>
      )}
    </div>
  );
}
