import React, { useEffect, useState } from "react";

import { useActivities } from "../../contexts/activitiesContext";
import { database } from "../../firebase";
import { findDeadline } from "../../utils/findDeadline";

import UpcomingDeadlineStyles from "./UpcomingDeadline.module.css";

import clock from "../../icons/clock.svg";
import deadlinecalendar from "../../icons/deadlinecalendar.svg";

export default function UpcomingDeadline() {
  const [deadline, setDeadline] = useState();
  const [timeleft, setTimeLeft] = useState();
  const { activitiesLoading, activities } = useActivities();

  const earliestDeadline =
    activities.length >= 1
      ? activities.reduce((min, activity) =>
          min.deadline < activity.deadline ? min : activity
        )
      : null;

  const { deadline, timeleft, interval } = useEffect(() => {
    const { deadline, timeleft, interval } = findDeadline(
      earliestDeadline.deadline
    );
    setInterval(() => {
      setDeadline(deadline);
      setTimeLeft(timeleft);
    }, interval);
  });

  return (
    <div className={UpcomingDeadlineStyles.container}>
      {console.log(deadline)}
      {console.log(timeleft)}
      <div className={UpcomingDeadlineStyles.header}>
        <h1>Upcoming Deadline</h1>
      </div>
      <div className={UpcomingDeadlineStyles.time}>
        <div className={UpcomingDeadlineStyles.timeleft}>
          <p>Time left</p>
          <div className={UpcomingDeadlineStyles.timer}>
            <img src={clock} alt="Clock" />
            <p className={UpcomingDeadlineStyles.timeleftdigits}>12:30:43</p>
          </div>
        </div>
        <div className={UpcomingDeadlineStyles.timeleft}>
          <p>Deadline</p>
          <div className={UpcomingDeadlineStyles.timer}>
            <img src={deadlinecalendar} alt="Icon" />
            <p>5 December 2021</p>
          </div>
        </div>
      </div>
      <p className={UpcomingDeadlineStyles.activity}>
        Activity: <span>Build a new website</span>
      </p>
    </div>
  );
}
