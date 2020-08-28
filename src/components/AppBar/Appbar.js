import React from "react";
import {Toolbar, AppBar, Typography} from "@material-ui/core";
import classes from "./Appbar.module.css";
import {Link} from "react-router-dom";

export const Appbar = props => {
  return (
    <div>
      <AppBar position="static" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
          >
            NASA API Client
          </Typography>{" "}
          <Typography
            variant="h4"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
          >
            {props.title}
          </Typography>
          <nav>
            <Link to="/" className={classes.link}>
              APOD
            </Link>
            <Link to="/mars-rover" className={classes.link}>
              Mars Rover
            </Link>
          </nav>
        </Toolbar>
      </AppBar>
    </div>
  );
};
