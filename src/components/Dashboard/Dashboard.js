import React, { useState } from "react";
import AddActivityModal from "../AddActivityModal/AddActivityModal";

import DashboardNav from "../DashboardNav/DashboardNav";

import DashboardStyles from "./Dashboard.module.css";

export default function Dashboard() {
  const [adding, setAdding] = useState(false);
  return (
    <div>
      <div>
        <DashboardNav modal={{ adding, setAdding }} />
      </div>
      {adding && (
        <div className={DashboardStyles.modal}>
          <AddActivityModal modal={{ adding, setAdding }} />
        </div>
      )}
    </div>
  );
}
