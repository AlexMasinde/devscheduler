import React, { useEffect, useState } from "react";

import { useActivities } from "../../contexts/activitiesContext";
import { findDeadline } from "../../utils/findDeadline";

import UpcomingDeadlineStyles from "./UpcomingDeadline.module.css";

import clock from "../../icons/clock.svg";
import deadlinecalendar from "../../icons/deadlinecalendar.svg";
import Loading from "../Loading/Loading";

export default function UpcomingDeadline() {
  const [deadline, setDeadline] = useState();
  const [timer, setTimer] = useState();
  const [activityName, setActivityName] = useState("");
  const { activities, loadingData } = useActivities();

  function fetchTimeleft() {
    const earliestDeadline =
      activities.length !== 0
        ? activities.reduce((min, activity) =>
            min.deadline < activity.deadline ? min : activity
          )
        : null;
    const { deadline, timeleft, interval } = findDeadline(
      earliestDeadline.deadline
    );
    setDeadline(deadline);
    setTimer(timeleft);
    setActivityName(earliestDeadline.name);
    return interval;
  }

  useEffect(() => {
    let countdown;
    if (activities.length < 1) {
      console.log("not ready");
    } else {
      const interval = fetchTimeleft();
      countdown = setInterval(() => {
        fetchTimeleft();
      }, interval);
    }
    return () => clearInterval(countdown);
  });

  return (
    <div className={UpcomingDeadlineStyles.container}>
      <div className={UpcomingDeadlineStyles.header}>
        <h1>Upcoming Deadline</h1>
      </div>
      {loadingData && (
        <div>
          <Loading />
        </div>
      )}

      {!loadingData && activities.length > 0 && (
        <>
          <div className={UpcomingDeadlineStyles.time}>
            <div className={UpcomingDeadlineStyles.timeleft}>
              <p>Time Left</p>
              <div className={UpcomingDeadlineStyles.timer}>
                <img src={clock} alt="Clock" />
                <p className={UpcomingDeadlineStyles.timeleftdigits}>{timer}</p>
              </div>
            </div>
            <div className={UpcomingDeadlineStyles.timeleft}>
              <p>Deadline</p>
              <div className={UpcomingDeadlineStyles.timer}>
                <img src={deadlinecalendar} alt="icon" />
                <p>{deadline}</p>
              </div>
            </div>
          </div>
          <p className={UpcomingDeadlineStyles.activity}>
            Activity: <span>{activityName}</span>
          </p>
        </>
      )}
      {!loadingData && activities.length === 0 && (
        <div className={UpcomingDeadlineStyles.message}>
          <p>You do not have any activities</p>
        </div>
      )}
    </div>
  );
}
