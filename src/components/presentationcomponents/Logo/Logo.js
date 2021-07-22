import React from "react";
import { Link } from "react-router";

import LogoStyles from "./Logo.module.css";

import logoIcon from "../../../icons/logo.svg";

export default function Logo({ url }) {
  return (
    <Link to={url}>
      <img className={LogoStyles.logo} src={logoIcon} alt="Dev Scheduler" />
    </Link>
  );
}
