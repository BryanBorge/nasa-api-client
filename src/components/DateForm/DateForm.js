import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import classes from "./DateForm.module.css";

const DateForm = (props) => {
  return (
    <div className={classes.Form}>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item sm={1.5}>
          <div className={classes.Input}>
            <TextField
              id="date"
              label="Date"
              type="date"
              defaultValue={props.date}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => props.handleDateChange(e.target.value)}
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
              onClick={props.getPictureOfTheDay}
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
