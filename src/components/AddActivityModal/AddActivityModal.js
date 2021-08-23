import React, { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import { v4 as uuidv4 } from "uuid";

import { database } from "../../firebase";

import { useModal } from "../../contexts/modalContext";

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

export default function AddActivityModal({ modal }) {
  const [dropdown, setDropdown] = useState(false);
  const [category, setCategory] = useState("Select Category");
  const [activity, setActivity] = useState("Activity Name");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [deadline, setDeadline] = useState(new Date());
  const { setAdding } = useModal();

  function handleSelect() {
    setDropdown(!dropdown);
  }

  function selectOption(e) {
    const category =
      e.target.innerText === "Select Category" ? "" : e.target.innerText;
    setCategory(category);
    setDropdown(false);
  }

  function handleActivity(e) {
    const activityName = e.target.value;
    setActivity(activityName);
  }

  function handleDeadline(deadline) {
    setDeadline(deadline);
  }

  function handleModal() {
    setAdding(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("form submitted");
    const { validationErrors, valid } = validateActivity(
      activity,
      category,
      deadline
    );

    if (!valid) {
      return setErrors(validationErrors);
    }

    try {
      console.log("no errors, code moved forward");
      setLoading(true);
      const activityId = uuidv4();
      const activityDetails = {
        name: activity,
        deadline,
      };

      switch (category) {
        case "Projects":
          await database.projects.doc(activityId).set(activityDetails);
          break;
        case "Courses":
          await database.courses.doc(activityId).set(activityDetails);
          break;
        case "Readings":
          await database.readings.doc(activityId).set(activityDetails);
          break;
        default:
          return setErrors({ ...errors, category: "Category not found" });
      }
      setLoading(false);
      setAdding(false);
      console.log("code ran");
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
            </div>
          </div>
          <div className={AddActivityModalStyles.buttons}>
            <Button text="Add" disabled={loading} type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}
