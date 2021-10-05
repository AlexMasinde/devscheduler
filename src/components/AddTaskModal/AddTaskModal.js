import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import DateTimePicker from "react-datetime-picker/dist/DateTimePicker";

import { useActivities } from "../../contexts/activitiesContext";
import { useAddTaskModalContext } from "../../contexts/addtaskModalContext";
import { useAuth } from "../../contexts/authContext";

import { database } from "../../firebase";
import { validateTask } from "../../utils/validators";

import AddTaskModalStyles from "./AddTaskModal.module.css";

import CloseIcon from "../CloseIcon/CloseIcon";
import CalenderIcon from "../CalenderIcon/CalenderIcon";
import Input from "../presentationcomponents/Input/Input";
import Button from "../presentationcomponents/Button/Button";

import closeicon from "../../icons/closeicon.svg";

export default function AddTaskModal() {
  const { currentUser } = useAuth();
  const { selectedActivity, dispatch, tasks, editingItem } = useActivities();
  const { edit, item } = editingItem;
  const { setAddingTask } = useAddTaskModalContext();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [deadline, setDeadline] = useState(new Date());
  const [task, setTask] = useState(edit ? item.name : "");

  function handleTask(e) {
    if (errors.name) {
      setErrors({ ...errors, name: "" });
    }
    setTask(e.target.value);
  }

  function handleDeadline(deadline) {
    if (errors.deadline) {
      setErrors({ ...errors, deadline: "" });
    }
    setDeadline(deadline);
  }

  function handleModal() {
    if (edit) {
      dispatch({
        type: "SET_EDITING_ITEM",
        payload: {
          edit: false,
          item: {},
        },
      });
    }
    setAddingTask(false);
  }

  async function updateTask() {
    try {
      setLoading(true);
      if (item.name === task && item.deadline === deadline) {
        return setErrors({
          ...errors,
          edit: "Please supply new task values to continue",
        });
      }
      const newTask = {};
      if (task !== item.name) {
        newTask.name = task;
      }
      if (deadline !== item.deadline) {
        newTask.deadline = deadline;
      }
      await database.tasks.doc(item.id).update(newTask);
      const newTasks = tasks.filter((task) => task.id !== item.id);
      newTask.activityId = item.activityId;
      newTask.complete = item.complete;
      newTask.id = item.id;
      newTask.userId = currentUser.uid;
      dispatch({
        type: "SET_TASKS",
        payload: [newTask, ...newTasks],
      });
      setLoading(false);
      setAddingTask(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  async function writeTask() {
    try {
      setLoading(true);
      const taskId = uuidv4();
      const taskObject = {
        name: task,
        deadline,
        activityId: selectedActivity.id,
        complete: false,
        id: taskId,
        userId: currentUser.uid,
        createdAt: database.timestamp,
      };
      await database.tasks.doc(taskId).set(taskObject);
      dispatch({
        type: "SET_TASKS",
        payload: [taskObject, ...tasks],
      });
      setLoading(false);
      setAddingTask(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { validationErrors, valid } = validateTask(deadline, task);
    if (!valid) {
      return setErrors(validationErrors);
    }
    edit ? await updateTask() : await writeTask();
  }

  return (
    <div className={AddTaskModalStyles.container}>
      <div className={AddTaskModalStyles.title}>
        <h1>{edit ? "Edit Task" : "Add Task"}</h1>
        <img onClick={() => handleModal()} src={closeicon} alt="close" />
      </div>
      <form onSubmit={handleSubmit}>
        <div className={AddTaskModalStyles.name}>
          <label>
            <p className={AddTaskModalStyles.inputtitle}>Task Name</p>
            <Input
              type="text"
              required={true}
              placeholder="Task Name"
              onChange={handleTask}
              value={task}
            />
          </label>
          {errors && errors.name && (
            <p data-testid="error" className={AddTaskModalStyles.error}>
              {errors.name}
            </p>
          )}
        </div>

        <div className={AddTaskModalStyles.deadline}>
          <p className={AddTaskModalStyles.inputtitle}>Deadline</p>
          <div className={AddTaskModalStyles.datepickercontainer}>
            <main className={AddTaskModalStyles.datepickercontent}>
              <DateTimePicker
                amPmAriaLabel="Select AM/PM"
                calendarAriaLabel="Toggle calendar"
                clearAriaLabel="Clear value"
                dayAriaLabel="Day"
                hourAriaLabel="Hour"
                maxDetail="second"
                minuteAriaLabel="Minute"
                monthAriaLabel="Month"
                nativeInputAriaLabel="Date and time"
                onChange={(deadline) => {
                  handleDeadline(deadline);
                }}
                secondAriaLabel="Second"
                value={deadline}
                yearAriaLabel="Year"
                className={AddTaskModalStyles.test}
                calendarClassName={AddTaskModalStyles.calender}
                calendarIcon={<CalenderIcon />}
                clearIcon={<CloseIcon />}
              />
            </main>
          </div>
          {errors && errors.deadline && (
            <p data-testid="error" className={AddTaskModalStyles.error}>
              {errors.deadline}
            </p>
          )}
        </div>
        <div className={AddTaskModalStyles.buttons}>
          <Button
            text={edit ? "Update" : "Add"}
            disabled={loading}
            loading={loading}
            type="submit"
          />
        </div>
      </form>
    </div>
  );
}
