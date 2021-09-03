import React, { useEffect, useState } from "react";

import UpcomingDeadlineStyles from "./UpcomingDeadline.module.css";

import clock from "../../icons/clock.svg";
import deadlinecalendar from "../../icons/deadlinecalendar.svg";
import { database } from "../../firebase";
import { findDeadline } from "../../utils/findDeadline";

export default function UpcomingDeadline() {
  const [deadline, setDeadline] = useState();
  const [timeleft, setTimeLeft] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getActivity() {
      try {
        setLoading(false);
        const unformattedActivity = await database.activities
          .orderBy("deadline", "asc")
          .limit(1)
          .get();
        const activity = unformattedActivity.docs.map((doc) => {
          return database.formatDocument(doc);
        });
        console.log(activity[0].deadline.toDate());
        const { deadline, timeleft } = findDeadline(activity[0].deadline);
        setDeadline(deadline);
        setTimeLeft(timeleft);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    }
    getActivity();
  }, []);

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
