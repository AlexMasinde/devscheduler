import React, { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import { v4 as uuidv4 } from "uuid";

import { database } from "../../firebase";

import { useModal } from "../../contexts/modalContext";
import { useActivities } from "../../contexts/activitiesContext";

import AddActivityModalStyles from "./AddActivityModal.module.css";

import CalenderIcon from "./components/CalenderIcon/CalenderIcon";
import CloseIcon from "./components/CloseIcon/CloseIcon";
import Input from "../presentationcomponents/Input/Input";
import Button from "../presentationcomponents/Button/Button";

import arrowdown from "../../icons/arrowdown.svg";
import arrowup from "../../icons/arrowup.svg";
import projectsicon from "../../icons/projectsicon.svg";
import coursesicon from "../../icons/coursesicon.svg";
import readingsicon from "../../icons/readingsicon.svg";
import closeicon from "../../icons/closeicon.svg";

import { validateActivity } from "../../utils/validators";

export default function AddActivityModal() {
  const { activities, dispatch } = useActivities();
  const [dropdown, setDropdown] = useState(false);
  const [category, setCategory] = useState("Select Category");
  const [activity, setActivity] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [deadline, setDeadline] = useState(new Date());
  const { setAdding } = useModal();

  function handleSelect() {
    if (errors.category) {
      setErrors({ ...errors, category: "" });
    }
    setDropdown(!dropdown);
  }

  function selectOption(e) {
    const checkCategory = e.target.innerText;
    setCategory(checkCategory);
    setDropdown(false);
  }

  function handleActivity(e) {
    if (errors.activityName) {
      setErrors({ ...errors, activityName: "" });
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
    setAdding(false);
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
      console.log(validationErrors);
      return setErrors(validationErrors);
    }

    try {
      setLoading(true);
      const activityId = uuidv4();
      const activityDetails = {
        name: activity,
        selectedCategory,
        deadline,
      };
      await database.activities.doc(activityId).set(activityDetails);
      dispatch({
        type: "set-activities",
        payload: [{ ...activityDetails, id: activityId }, ...activities],
      });
      setLoading(false);
      setAdding(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  return (
    <div className={AddActivityModalStyles.container}>
      <div className={AddActivityModalStyles.title}>
        <h1>Add Activity</h1>
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
                onChange={handleActivity}
              />
            </label>
            {errors && errors.activityName && (
              <p className={AddActivityModalStyles.error}>
                {errors.activityName}
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
                      onClick={(e) => selectOption(e)}
                      className={AddActivityModalStyles.option}
                    >
                      <span>
                        <img src={projectsicon} alt="icon" />
                      </span>
                      Projects
                    </span>
                    <span
                      onClick={(e) => selectOption(e)}
                      className={AddActivityModalStyles.option}
                    >
                      <span>
                        <img src={coursesicon} alt="icon" />
                      </span>
                      Courses
                    </span>
                    <span
                      onClick={(e) => selectOption(e)}
                      className={AddActivityModalStyles.option}
                    >
                      <span>
                        <img src={readingsicon} alt="icon" />
                      </span>
                      Readings
                    </span>
                  </div>
                )}
              </div>
              {errors && errors.category && (
                <p className={AddActivityModalStyles.error}>
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
                <p className={AddActivityModalStyles.error}>
                  {errors.deadline}
                </p>
              )}
            </div>
          </div>
          <div className={AddActivityModalStyles.buttons}>
            <Button
              text="Add"
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
