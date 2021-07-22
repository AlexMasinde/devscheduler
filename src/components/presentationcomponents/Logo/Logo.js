import React from "react";

import LogoStyles from "./Logo.module.css";

import logoIcon from "../../../icons/logo.svg";

export default function Logo({ url }) {
  return (
    <a href={url}>
      <img className={LogoStyles.logo} src={logoIcon} alt="Dev Scheduler" />
    </a>
  );
}
