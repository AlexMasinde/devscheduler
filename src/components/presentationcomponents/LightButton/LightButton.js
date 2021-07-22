import React from "react";

import ButtonLight from "./LightButton.module.css";
export default function LightButton({ text }) {
  return <button className={ButtonLight.btn}>{text}</button>;
}
