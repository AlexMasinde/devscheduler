import React from "react";

import InputStyles from "./Input.module.css";

export default function Input({ placeholder }) {
  return <input className={InputStyles.input} placeholder={placeholder} />;
}