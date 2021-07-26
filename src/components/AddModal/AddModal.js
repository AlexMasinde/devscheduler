import React from "react";

import AddModalStyles from "./AddModal.module.css";

export default function AddModal() {
  return (
    <div className={AddModalStyles.container}>
      <h1>Add Activity</h1>
      <div className={AddModalStyles.content}>
        <form>
          <div className={AddModalStyles.name}></div>
        </form>
      </div>
    </div>
  );
}
