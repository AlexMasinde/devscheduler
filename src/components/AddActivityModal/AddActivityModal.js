import React, { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import { v4 as uuidv4 } from "uuid";

import { database } from "../../firebase";

import { useModal } from "../../contexts/modalContext";
import { useActivities } from "../../contexts/activitiesContext";

import AddActivityModalStyles from "./AddActivityModal.module.css";

import CalenderIcon from "../CalenderIcon/CalenderIcon";
import CloseIcon from "../CloseIcon/CloseIcon";
import Input from "../presentationcomponents/Input/Input";
import Button from "../presentationcomponents/Button/Button";

import arrowdown from "../../icons/arrowdown.svg";
import arrowup from "../../icons/arrowup.svg";
import closeicon from "../../icons/closeicon.svg";

import { validateActivity } from "../../utils/validators";

export default function AddActivityModal() {
  const { setAdding } = useModal();
  const { dispatch, activities, editingItem } = useActivities();
  const { edit, item } = editingItem;
  const [dropdown, setDropdown] = useState(false);
  const [category, setCategory] = useState(
    edit ? item.category : "Select Category"
  );
  const [activity, setActivity] = useState(edit ? item.name : "");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [deadline, setDeadline] = useState(new Date());

  function handleSelect() {
    if (errors.category) {
      setErrors({ ...errors, category: "" });
    }
    setDropdown(!dropdown);
  }

  function selectOption(e) {
    const checkCategory = e.target.innerText || e.target.textContent;
    setCategory(checkCategory);
    setDropdown(false);
  }

  function handleActivity(e) {
    if (errors.name) {
      setErrors({ ...errors, name: "" });
    }
    const activityName = e.target.value;
    setActivity(activityName);
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
    setAdding(false);
  }

  async function updateActivity() {
    try {
      setLoading(true);
      if (item.name === activity && item.deadline === deadline) {
        return setErrors({
          ...errors,
          edit: "Please supply new activity values to update",
        });
      }
      const newActivity = {};
      if (activity !== item.name) {
        newActivity.name = activity;
      }
      if (deadline !== item.deadline) {
        newActivity.deadline = deadline;
      }
      await database.activities.doc(item.id).update(newActivity);
      const newActivities = activities.filter(
        (activity) => activity.id !== item.id
      );
      newActivity.id = item.id;
      newActivity.complete = item.complete;
      newActivity.category = item.category;
      const updatedActivities = [newActivity, ...newActivities];
      dispatch({
        type: "SET_ACTIVITIES",
        payload: updatedActivities,
      });
      dispatch({
        type: "SELECT_ACTIVITY",
        payload: newActivity,
      });
      setLoading(false);
      setAdding(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  async function writeActivity(selectedCategory) {
    try {
      setLoading(true);
      const activityId = uuidv4();
      const activityDetails = {
        name: activity,
        category: selectedCategory,
        deadline: deadline.getTime(),
        complete: false,
        createdAt: database.timestamp,
      };
      const timeStamp = deadline.getTime();
      console.log(new Date(timeStamp));
      await database.activities.doc(activityId).set(activityDetails);
      console.log(activityDetails);
      dispatch({
        type: "SET_ACTIVITIES",
        payload: [{ ...activityDetails, id: activityId }, ...activities],
      });
      setLoading(false);
      setAdding(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const selectedCategory = category === "Select Category" ? "" : category;
    const { validationErrors, valid } = validateActivity(
      activity,
      selectedCategory,
      deadline
    );

    if (!valid) {
      return setErrors(validationErrors);
    }

    edit ? await updateActivity() : await writeActivity(selectedCategory);
  }

  return (
    <div className={AddActivityModalStyles.container}>
      <div className={AddActivityModalStyles.title}>
        <h1>{edit ? "Edit Activity" : "Add Activity"}</h1>
        <img onClick={() => handleModal()} src={closeicon} alt="close" />
      </div>
      <div className={AddActivityModalStyles.content}>
        <form onSubmit={handleSubmit}>
          <div className={AddActivityModalStyles.name}>
            <label>
              <p className={AddActivityModalStyles.inputtitle}>Activity Name</p>
              <Input
                type="text"
                required={true}
                placeholder="Activity Name"
                value={activity}
                onChange={handleActivity}
              />
            </label>
            {errors && errors.name && (
              <p data-testid="error" className={AddActivityModalStyles.error}>
                {errors.name}
              </p>
            )}
          </div>
          <div className={AddActivityModalStyles.details}>
            <div className={AddActivityModalStyles.category}>
              <p className={AddActivityModalStyles.inputtitle}>Category</p>
              <div className={AddActivityModalStyles.select}>
                <div
                  onClick={() => handleSelect()}
                  className={AddActivityModalStyles.selectheader}
                >
                  <span>
                    {category}{" "}
                    <img src={dropdown ? arrowup : arrowdown} alt="arrow" />
                  </span>
                </div>
                {dropdown && (
                  <div className={AddActivityModalStyles.options}>
                    <span
                      data-testid="add-activity-category"
                      onClick={(e) => selectOption(e)}
                      className={AddActivityModalStyles.option}
                    >
                      Projects
                    </span>
                    <span
                      data-testid="add-activity-category"
                      onClick={(e) => selectOption(e)}
                      className={AddActivityModalStyles.option}
                    >
                      Courses
                    </span>
                    <span
                      data-testid="add-activity-category"
                      onClick={(e) => selectOption(e)}
                      className={AddActivityModalStyles.option}
                    >
                      Readings
                    </span>
                  </div>
                )}
              </div>
              {errors && errors.category && (
                <p data-testid="error" className={AddActivityModalStyles.error}>
                  {errors.category}
                </p>
              )}
            </div>
            <div className={AddActivityModalStyles.deadline}>
              <p className={AddActivityModalStyles.inputtitle}>Deadline</p>
              <div className={AddActivityModalStyles.datepickercontainer}>
                <main className={AddActivityModalStyles.datepickercontent}>
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
                    className={AddActivityModalStyles.test}
                    calendarClassName={AddActivityModalStyles.calender}
                    calendarIcon={<CalenderIcon />}
                    clearIcon={<CloseIcon />}
                  />
                </main>
              </div>
              {errors && errors.deadline && (
                <p data-testid="error" className={AddActivityModalStyles.error}>
                  {errors.deadline}
                </p>
              )}
            </div>
          </div>
          <div className={AddActivityModalStyles.buttons}>
            <Button
              text={edit ? "Update Activity" : "Add Activity"}
              disabled={loading}
              loading={loading}
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
