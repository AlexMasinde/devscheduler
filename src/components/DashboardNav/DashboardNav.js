import React from "react";

import AddButton from "./DashboardNavComponents/AddButton/AddButton";
import NavUser from "./DashboardNavComponents/NavUser/NavUser";

import DashboardNavStyles from "./DashboardNav.module.css";

export default function Nav({ modal }) {
  const btnText = "Add Activity";
  return (
    <div className={DashboardNavStyles.container}>
      <div>
        <AddButton modal={modal} text={btnText} />
      </div>
      <div>
        <NavUser />
      </div>
    </div>
  );
}
