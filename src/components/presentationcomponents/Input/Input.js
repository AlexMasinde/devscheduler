import React from "react";

import InputStyles from "./Input.module.css";

export default function Input({ placeholder, type, onChange }) {
  return (
    <input
      className={InputStyles.input}
      placeholder={placeholder}
      type={type}
      onChange={onChange}
    />
  );
}
