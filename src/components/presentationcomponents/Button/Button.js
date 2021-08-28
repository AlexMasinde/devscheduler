import React from "react";
import RegularButtonStyles from "./Button.module.css";

export default function Button({ text, disabled, type, loading }) {
  const buttonLoading = loading ? RegularButtonStyles.buttonloading : "";
  const textLoading = loading ? RegularButtonStyles.textloading : "";

  return (
    <button
      className={`${RegularButtonStyles.btn} ${buttonLoading}`}
      disabled={disabled}
      type={type}
    >
      <span className={textLoading}>{text}</span>
    </button>
  );
}
