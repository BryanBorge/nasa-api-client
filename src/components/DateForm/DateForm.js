import React from "react";

const DateForm = props => {
  return (
    <div>
      <form>
        <label>
          Month:
          <input
            type="number"
            name="month"
            min="1"
            max="12"
            maxLength="2"
            value={props.month}
            onChange={e => props.handleMonthChange(e.target.value)}
          ></input>
        </label>
        <label>
          Day:
          <input
            type="number"
            name="day"
            min="1"
            max="31"
            maxLength="2"
            value={props.day}
            onChange={e => props.handleDayChange(e.target.value)}
          ></input>
        </label>
        <label>
          Year:
          <input
            type="number"
            name="year"
            max="2020"
            maxLength="4"
            minLength="4"
            value={props.year}
            onChange={e => props.handleYearChange(e.target.value)}
          ></input>
        </label>
        <button onClick={props.handleSubmit}>Search</button>
        {props.apod && <button onClick={props.getPictureOfTheDay}>Todays Picture</button>}
      </form>
    </div>
  );
};
export default DateForm;
