import React from "react";

import AddButton from "./DashboardNavComponents/AddButton/AddButton";
import NavUser from "./NavUser/NavUser";

import DashboardNavStyles from "./DashboardNav.module.css";

export default function Nav() {
  const btnText = "Add Activity";
  return (
    <div className={DashboardNavStyles.container}>
      <div>
        <AddButton text={btnText} />
      </div>
      <div>
        <NavUser />
      </div>
    </div>
  );
}
