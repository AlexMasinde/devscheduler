import React from "react";

import AddButtonStyles from "./AddButton.module.css";

export default function AddButton({ text, modal }) {
  const { adding, setAdding } = modal;

  function handleModal() {
    setAdding(!adding);
  }

  return (
    <div onClick={() => handleModal()} className={AddButtonStyles.button}>
      <div className={AddButtonStyles.circle}>
        <span className={AddButtonStyles.sign}></span>
      </div>
      <div className={AddButtonStyles.text}>
        <p>{text}</p>
      </div>
    </div>
  );
}
