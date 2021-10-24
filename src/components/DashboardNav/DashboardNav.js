import React from "react";

import AddButton from "./DashboardNavComponents/AddButton/AddButton";

import DashboardNavStyles from "./DashboardNav.module.css";
import NavUser from "../NavUser/NavUser";

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
