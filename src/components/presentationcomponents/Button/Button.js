import React from "react";
import RegularButton from "./Button.module.css";

export default function Button({ text, disabled, type }) {
  return (
    <button className={RegularButton.btn} disabled={disabled} type={type}>
      {text}
    </button>
  );
}
