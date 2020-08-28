import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import classes from "./DateForm.module.css";
import {KeyboardDatePicker} from "@material-ui/pickers";

const DateForm = props => {
  return (
    <div className={classes.Form}>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item sm={1.5}>
          <div className={classes.Input}>
            <KeyboardDatePicker
              clearable
              value={props.date}
              placeholder="MM/DD/YYYY"
              onChange={date => {
                console.log(date);
                props.handleDateChange(date);
              }}
              maxDate={new Date()}
              minDate={new Date("Fri Jun 16 1995 00:00:00 GMT-0400")}
              format="MM/dd/yyyy"
            />
          </div>
        </Grid>
        <Grid item sm={1.5}>
          <div className={classes.Button}>
            <Button
              onClick={props.handleSubmit}
              variant="contained"
              color="primary"
            >
              Search
            </Button>
          </div>
        </Grid>
        <Grid item sm={1.5}>
          <div className={classes.Button}>
            <Button
              variant="contained"
              onClick={() => props.getPictureOfTheDay(true)}
              className={classes.Button}
            >
              Todays Picture
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default DateForm;
