import React from "react";
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  table: {
    minWidth: 400,
  },
});

function Row(props) {
  const {rover} = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {rover.name}
        </TableCell>
        <TableCell align="right">{rover.launch_date}</TableCell>
        <TableCell align="right">{rover.landing_date}</TableCell>
        <TableCell align="right">{rover.max_date}</TableCell>
        <TableCell align="right">{rover.max_sol}</TableCell>
        <TableCell align="right">{rover.total_photos}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Cameras
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Abbrev</TableCell>
                    <TableCell>Full name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rover.cameras.map(camera => (
                    <TableRow key={camera.name}>
                      <TableCell component="th" scope="row">
                        {camera.name}
                      </TableCell>
                      <TableCell>{camera.full_name}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export function CollapsibleTable(props) {
  const classes = useRowStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small">
        <caption>
          Query pictures by selecting a rover, a camera, and a sol value from
          ranging from 0-Max Sol for that rover. <br />
          Or get all pictures for a sol by not selecting a camera.
          <br />
          *sol - Martian rotation or day.
        </caption>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Rover Name</TableCell>
            <TableCell align="right">Launch date</TableCell>
            <TableCell align="right">Landing date</TableCell>
            <TableCell align="right">Max date</TableCell>
            <TableCell align="right">Max Sol</TableCell>
            <TableCell align="right">Total Pictures</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rovers.map(rover => (
            <Row key={rover.id} rover={rover} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
