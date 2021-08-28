import React, { useState } from "react";
import DateTimePicker from "react-datetime-picker/dist/DateTimePicker";

import AddTaskModalStyles from "./AddTaskModal.module.css";

import CloseIcon from "../CloseIcon/CloseIcon";
import CalenderIcon from "../CalenderIcon/CalenderIcon";
import Input from "../presentationcomponents/Input/Input";
import Button from "../presentationcomponents/Button/Button";

import closeicon from "../../icons/closeicon.svg";

export default function AddTaskModal() {
  const [errors, setErrors] = useState();
  const [loading, setLoading] = useState();
  const [deadline, setDeadline] = useState(new Date());
  const [task, setTask] = useState();

  function handleTask(e) {
    if (errors.task) {
      setErrors({ ...errors, task: "" });
    }
    setTask(e.target.value);
  }

  function handleDeadline(deadline) {
    if (errors.deadline) {
      setErrors({ ...errors, deadline: "" });
    }
    setDeadline(deadline);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const { errors, valid } = validateTask(deadline, task);

    if (!valid) {
      return setErrors(errors);
    }

    try {
      setLoading(true);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  return (
    <div className={AddTaskModalStyles.container}>
      <div className={AddTaskModalStyles.title}>
        <h1>Add Activity</h1>
        <img onClick={() => handleModal()} src={closeicon} alt="close" />
      </div>
      <form onSubmit={handleSubmit}>
        <div className={AddTaskModalStyles.name}>
          <label>
            <p className={AddTaskModalStyles.inputtitle}>Activity Name</p>
            <Input
              type="text"
              required={true}
              placeholder="Activity Name"
              onChange={handleTask}
            />
          </label>
          {errors && errors.activityName && (
            <p data-testid="error" className={AddTaskModalStyles.error}>
              {errors.activityName}
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
            text="Add"
            disabled={loading}
            loading={loading}
            type="submit"
          />
        </div>
      </form>
    </div>
  );
}
