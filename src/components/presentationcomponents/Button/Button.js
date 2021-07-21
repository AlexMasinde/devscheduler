import React from "react";
import RegularButton from "./Button.module.css";

export default function Button({ text }) {
  return (
    <div>
      <button className={RegularButton.btn}>{text}</button>
    </div>
  );
}
