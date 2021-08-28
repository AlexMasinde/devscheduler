import React from "react";
import { useModal } from "../../../../contexts/modalContext";

import AddButtonStyles from "./AddButton.module.css";

export default function AddButton({ text }) {
  const { adding, setAdding } = useModal();

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
