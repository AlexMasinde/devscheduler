import React from "react";
import RegularButtonStyles from "./Button.module.css";

export default function Button({
  text,
  disabled,
  type,
  loading,
  variant,
  onClick,
}) {
  const buttonLoading = loading ? RegularButtonStyles.buttonloading : "";
  const textLoading = loading ? RegularButtonStyles.textloading : "";
  const redBg = variant === "danger" ? RegularButtonStyles.danger : "";
  const whiteBg = variant === "light" ? RegularButtonStyles.light : "";

  return (
    <button
      className={`${RegularButtonStyles.btn} ${buttonLoading} ${redBg} ${whiteBg}`}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      <span className={textLoading}>{text}</span>
    </button>
  );
}
