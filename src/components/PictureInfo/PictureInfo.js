import React from "react";
import { DisplayDate } from "../../helper/DisplayDate";
import classes from "./PictureInfo.module.css";
const PictureInfo = props => {
  let credit = props.copyRight && <p> Image Credit: {props.copyRight}</p>;
  let showInfo = props.loading ? (
    <p> LOADING </p>
  ) : (
    <div className={classes.Info}>
      <h2>{props.title}</h2>
      <p>{props.Date && DisplayDate(props.date)}</p>
      <p>{props.desc}</p>
      <div>{credit}</div>
      <a>
        <img src={props.picture} alt={props.picture} />
      </a>
    </div>
  );
  return <div>{showInfo}</div>;
};

export default PictureInfo;
