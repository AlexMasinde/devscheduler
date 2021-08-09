import React, { useState } from "react";
import DateTimePicker from "react-datetime-picker";

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

export default function AddActivityModal({ modal }) {
  const [dropdown, setDropdown] = useState(false);
  const [selectText, setSelectText] = useState("Select Category");
  const [deadline, setDeadline] = useState(new Date());
  const { setAdding } = modal;

  function handleSelect() {
    setDropdown(!dropdown);
  }

  function selectOption(e) {
    const category = e.target.innerText;
    setSelectText(category);
    setDropdown(false);
  }

  function handleDeadline(e) {
    console.log(e);
    setDeadline(new Date());
  }

  function handleModal() {
    setAdding(false);
  }

  return (
    <div className={AddActivityModalStyles.container}>
      <div className={AddActivityModalStyles.title}>
        <h1>Add Activity</h1>
        <img onClick={() => handleModal()} src={closeicon} alt="close" />
      </div>
      <div className={AddActivityModalStyles.content}>
        <form>
          <div className={AddActivityModalStyles.name}>
            <label>
              <p className={AddActivityModalStyles.inputtitle}>Activity Name</p>
              <Input type="text" required="true" placeholder="Activity Name" />
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
                    {selectText}{" "}
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
                    onChange={(e) => {
                      handleDeadline(e);
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
            <Button type="submit" text="Add" />
          </div>
        </form>
      </div>
    </div>
  );
}
