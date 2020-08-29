import React, {useState} from "react";
import classes from "./RoverForm.module.css";
import {
  Input,
  Button,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
const RoverForm = props => {
  const handleRoverChange = e => {
    props.setRover(e.target.value);
  };
  const hanldeSolChange = e => {
    props.setSol(e.target.value);
  };
  const handleCameraChange = e => {
    props.setCamera(e.target.value);
  };

  let currentRoverData = props.rovers.find(r => r.name === props.rover);

  return (
    <div className={classes.roverForm}>
      <FormControl className={classes.formControl}>
        <InputLabel>Rover</InputLabel>
        <Select
          value={props.rover}
          onChange={handleRoverChange}
          className={classes.input}
        >
          {props.rovers.map(rover => (
            <MenuItem key={rover.id} value={rover.name}>
              {rover.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel>Camera</InputLabel>
        <Select
          value={props.camera}
          disabled={!props.rover}
          onChange={handleCameraChange}
          className={classes.input}
        >
          <MenuItem key={"empty"} value={"All Cameras"}>
            {"All cameras"}
          </MenuItem>
          {props.rovers
            .filter(rover => rover.name === props.rover)
            .map(rover =>
              rover.cameras.map(cam => (
                <MenuItem key={cam.name} value={cam.name}>
                  {cam.name}
                </MenuItem>
              ))
            )}
        </Select>
      </FormControl>{" "}
      <FormControl className={classes.formControl}>
        <InputLabel>Sol</InputLabel>
        <Input
          value={props.sol}
          disabled={!props.rover}
          onChange={hanldeSolChange}
          className={classes.input}
        />
      </FormControl>
      <Button
        onClick={props.handleSubmit}
        variant="contained"
        className={classes.Button}
      >
        Search
      </Button>
    </div>
  );
};

export default RoverForm;
