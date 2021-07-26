import React from "react";

import AddButtonStyles from "./AddButton.module.css";

export default function AddButton({ text }) {
  return (
    <div className={AddButtonStyles.button}>
      <div className={AddButtonStyles.circle}>
        <span className={AddButtonStyles.sign}></span>
      </div>
      <div className={AddButtonStyles.text}>
        <p>{text}</p>
      </div>
    </div>
  );
}
