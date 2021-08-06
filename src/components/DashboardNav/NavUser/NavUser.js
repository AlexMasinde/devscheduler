import React, { useState } from "react";

import NavUserStyles from "./NavUser.module.css";

import placeholderpic from "../../../icons/placeholderpic.png";
import arrowdowncolored from "../../../icons/arrowdowncolored.svg";
import arrowupcolored from "../../../icons/arrowupcolored.svg";

export default function NavUser() {
  const [dropdown, setDropdown] = useState(false);

  function handleDropdown() {
    setDropdown(!dropdown);
  }

  return (
    <div className={NavUserStyles.container}>
      <p>John Doe</p>
      <div className={NavUserStyles.profilepicture}>
        <img src={placeholderpic} />
      </div>
      <div onClick={() => handleDropdown()} className={NavUserStyles.arrow}>
        <img src={dropdown ? arrowupcolored : arrowdowncolored} />
      </div>
    </div>
  );
}
