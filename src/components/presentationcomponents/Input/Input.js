import React from "react";

import InputStyles from "./Input.module.css";

export default function Input({ placeholder, type, required, onChange }) {
  return (
    <input
      className={InputStyles.input}
      placeholder={placeholder}
      required={required}
      type={type}
      onChange={onChange}
    />
  );
}
