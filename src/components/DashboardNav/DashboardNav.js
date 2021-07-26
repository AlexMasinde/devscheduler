import React from "react";

import AddButton from "./DashboardNavComponents/AddButton/AddButton";

export default function Nav() {
  const btnText = "Add Activity";
  return (
    <div>
      <AddButton text={btnText} />
    </div>
  );
}
