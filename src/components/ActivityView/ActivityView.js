import React, { useEffect, useState } from "react";
import shortid from "shortid";

import { useActivities } from "../../contexts/activitiesContext";
import { useAddTaskModalContext } from "../../contexts/addtaskModalContext";

import TaskListItem from "../TaskListItem/TaskListItem";

import edit from "../../icons/edit.svg";
import trash from "../../icons/trash.svg";
import add from "../../icons/add.svg";

import ActivityViewStyles from "./ActivityView.module.css";
import { database } from "../../firebase";

export default function ActivityView() {
  const { setAddingTask } = useAddTaskModalContext();
  const { selectedActivity, activityTasks, dispatch } = useActivities();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getActivityTasks() {
      try {
        setLoading(true);
        const results = await database.tasks
          .where("activityId", "==", selectedActivity.id)
          .orderBy("deadline", "desc")
          .get();
        const formattedResults = results.docs.map((doc) => {
          return database.formatDocument(doc);
        });
        dispatch({
          type: "set-tasks",
          payload: formattedResults,
        });
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    }
    getActivityTasks();
    console.log("effect ran");
  }, [selectedActivity, dispatch]);

  function handleModal() {
    setAddingTask(true);
  }

  return (
    <div className={ActivityViewStyles.container}>
      {console.log(activityTasks)}
      <div className={ActivityViewStyles.header}>
        <p>{selectedActivity.name}</p>
        <div className={ActivityViewStyles.headercontent}>
          <div>
            <label className={ActivityViewStyles.checkboxcontainer}>
              <input type="checkbox" />
              <span className={ActivityViewStyles.checkmark}></span>
            </label>
            <p>Complete</p>
          </div>
          <div className={ActivityViewStyles.headericons}>
            <img src={edit} alt="edit" />
            <p>Edit</p>
          </div>
          <div className={ActivityViewStyles.headericons}>
            <img src={trash} alt="trash" />
            <p>Delete</p>
          </div>
        </div>
      </div>
      <div>
        {activityTasks.map((task) => {
          return <TaskListItem key={shortid.generate()} task={task} />;
        })}
      </div>
      <div onClick={() => handleModal()} className={ActivityViewStyles.add}>
        <img src={add} alt="Add task" />
        <span>Add Task</span>
      </div>
    </div>
  );
}
