export const DisplayDate = date => {
  let displayDate = new Date(date + " 00:00:00");
  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  displayDate = displayDate.toLocaleDateString("en-US", options);
  return displayDate;
};
