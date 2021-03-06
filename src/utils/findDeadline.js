export function findDeadline(rawDeadline) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const deadline = new Date(rawDeadline).toLocaleString("en-Uk", options);
  const diff = new Date(rawDeadline) - new Date();
  const seconds = ("0" + Math.floor((diff / 1000) % 60)).slice(-2);
  const minutes = ("0" + Math.floor((diff / 1000 / 60) % 60)).slice(-2);
  const hours = ("0" + Math.floor((diff / 1000 / 60 / 60) % 24)).slice(-2);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  let timeleft;
  let interval;
  if (days < 1) {
    timeleft = `${hours}:${minutes}:${seconds}`;
  } else {
    timeleft = `${days}d:${hours}h`;
  }

  if (days >= 1) {
    interval = 1000 * 60 * 60;
  } else {
    interval = 1000;
  }

  if (diff < 1) {
    timeleft = "00:00:00";
  }

  return { deadline, timeleft, interval };
}
