import React, { useState } from "react";

import { useAuth } from "../../../../contexts/authContext";

import placeholderpic from "../../../../icons/placeholder.jpg";
import arrowdowncolored from "../../../../icons/arrowdowncolored.svg";
import arrowupcolored from "../../../../icons/arrowupcolored.svg";

import NavUserStyles from "./NavUser.module.css";

export default function NavUser() {
  const { currentUser } = useAuth();
  const [dropdown, setDropdown] = useState(false);

  function handleDropdown() {
    setDropdown(!dropdown);
  }

  return (
    <div className={NavUserStyles.container}>
      <p>{currentUser.name ?? currentUser.email}</p>
      <div className={NavUserStyles.profilepicture}>
        <img src={placeholderpic} alt="profile" />
      </div>
      <div onClick={() => handleDropdown()} className={NavUserStyles.arrow}>
        <img src={dropdown ? arrowupcolored : arrowdowncolored} alt="" />
      </div>
    </div>
  );
}
