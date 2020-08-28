import React from "react";
import APOD from "./containers/AstronomyPicOfTheDay/APOD";
import MarsRover from "./containers/MarsRover/MarsRover";
import {Appbar} from "./components/AppBar/Appbar";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

function App() {
  let baseUrl = "https://bryanborge.github.io/nasa-api-client";
  return (
    <div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Router basename={baseUrl}>
          <Switch>
            <Route exact path="/">
              <Appbar title="Astronomy Picture Of The Day" />
              <APOD />
            </Route>
            <Route exact path="/mars-rover">
              <Appbar title="Mars Rover" />
              <MarsRover />
            </Route>
          </Switch>
        </Router>
      </MuiPickersUtilsProvider>
    </div>
  );
}

export default App;
