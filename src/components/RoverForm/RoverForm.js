import React from "react";
import DateForm from "../DateForm/DateForm";
import classes from "./RoverForm.module.css";

const RoverForm = props => {
  return (
    <div className={classes.roverForm}>
      <select id="Rover" onChange={props.handleRoverChange}>
        <option selected disabled hidden>
          Select a rover
        </option>
        <option>{props.option1}</option>
        <option>{props.option2}</option>
        <option>{props.option3}</option>
      </select>
      <DateForm
        handleSubmit={props.handleSubmit}
        month={props.month}
        handleMonthChange={props.handleMonthChange}
        day={props.day}
        handleDayChange={props.handleDayChange}
        year={props.year}
        handleYearChange={props.handleYearChange}
        date={props.date}
        handleDateChange={props.handleDateChange}
      />
    </div>
  );
};

export default RoverForm;
