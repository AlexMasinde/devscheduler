import React, { useEffect, useState } from "react";

import { useActivities } from "../../contexts/activitiesContext";
import { findDeadline } from "../../utils/findDeadline";

import UpcomingDeadlineStyles from "./UpcomingDeadline.module.css";

import clock from "../../icons/clock.svg";
import deadlinecalendar from "../../icons/deadlinecalendar.svg";

export default function UpcomingDeadline() {
  const [deadline, setDeadline] = useState();
  const [timer, setTimer] = useState();
  const { activities } = useActivities();

  function fetchTimeleft() {
    const earliestDeadline =
      activities.length >= 1
        ? activities.reduce((min, activity) =>
            min.deadline < activity.deadline ? min : activity
          )
        : null;
    const { deadline, timeleft, interval } = findDeadline(
      earliestDeadline.deadline
    );
    setDeadline(deadline);
    setTimer(timeleft);
    return interval;
  }

  useEffect(() => {
    let countdown;
    if (activities.length < 1) {
      console.log("not ready");
    } else {
      const interval = fetchTimeleft();
      countdown = setInterval(fetchTimeleft, interval);
    }
    return () => clearInterval(countdown);
  });

  return (
    <div className={UpcomingDeadlineStyles.container}>
      {console.log(timer)}
      {console.log(deadline)}
      <div className={UpcomingDeadlineStyles.header}>
        <h1>Upcoming Deadline</h1>
      </div>
      <div className={UpcomingDeadlineStyles.time}>
        <div className={UpcomingDeadlineStyles.timeleft}>
          <p>Time Left</p>
          <div className={UpcomingDeadlineStyles.timer}>
            <img src={clock} alt="Clock" />
            <p className={UpcomingDeadlineStyles.timeleftdigits}>
              {timer ?? "Time Left"}
            </p>
          </div>
        </div>
        <div className={UpcomingDeadlineStyles.timeleft}>
          <p>Deadline</p>
          <div className={UpcomingDeadlineStyles.timer}>
            <img src={deadlinecalendar} alt="Icon" />
            <p>{deadline ?? "5 December 2021"}</p>
          </div>
        </div>
      </div>
      <p className={UpcomingDeadlineStyles.activity}>
        Activity: <span>Build a new website</span>
      </p>
    </div>
  );
}
