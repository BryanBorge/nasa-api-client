import React from "react";
import ReactPlayer from "react-player";
import classes from "./PictureInfo.module.css";

const PictureInfo = props => {
  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };

  let credit = props.copyRight && <p> Image Credit: {props.copyRight}</p>;
  let showInfo = props.loading ? (
    <p> LOADING </p>
  ) : (
    <div className={classes.Info}>
      <h2>{props.title}</h2>
      <p>{props.date.toLocaleString("en-US", options)}</p>
      <p>{props.desc}</p>
      <div>{credit}</div>

      {props.picture.includes("youtube") ? (
        <ReactPlayer
          className={classes.video}
          url={props.picture}
          controls={true}
        />
      ) : (
        <img src={props.picture} alt="N/A" />
      )}
    </div>
  );
  return <div>{!props.success ? showInfo : <p> No Results Found</p>}</div>;
};

export default PictureInfo;
