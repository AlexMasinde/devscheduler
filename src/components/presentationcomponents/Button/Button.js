import React from "react";
import RegularButton from "./Button.module.css";

export default function Button({ text }) {
  return <button className={RegularButton.btn}>{text}</button>;
}
