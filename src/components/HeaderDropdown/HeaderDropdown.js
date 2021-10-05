import React from "react";

import theme from "../../icons/theme.svg";
import user from "../../icons/user.svg";
import logout from "../../icons/logout.svg";

import HeaderDropdownStyles from "./HeaderDropdown.module.css";

export default function HeaderDropdown() {
  return (
    <div className={HeaderDropdownStyles.container}>
      <div className={HeaderDropdownStyles.item}>
        <img src={user} alt="user profile" />
        <p>Account</p>
      </div>
      <div className={HeaderDropdownStyles.item}>
        <img src={theme} alt="toggle theme" />
        <p>Theme</p>
      </div>
      <div className={HeaderDropdownStyles.item}>
        <img src={logout} alt="logout" />
        <p>Logout</p>
      </div>
    </div>
  );
}
