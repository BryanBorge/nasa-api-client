import React from "react";
import ReactPlayer from "react-player";
import classes from "./PictureInfo.module.css";

const PictureInfo = props => {
  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  let credit = props.copyRight && <p> Image Credit: {props.copyRight}</p>;
  let showInfo = props.loading ? (
    <p> LOADING </p>
  ) : (
    <div>
      <div className={classes.Info}>
        <h2>{props.title}</h2>
        <p>
          {new Date(props.date.split("-").join("/")).toLocaleDateString(
            "en-US",
            options
          )}
        </p>
        <p>{props.desc}</p>
        <div>{credit}</div>
      </div>
      <div>
        {props.picture.includes("youtube") ? (
          <ReactPlayer
            url={props.picture}
            controls={true}
            className={classes.reactplayer}
          />
        ) : (
          <img src={props.picture} alt="N/A" className={classes.Img} />
        )}
      </div>
    </div>
  );
  return <div>{!props.success ? showInfo : <p> No Results Found</p>}</div>;
};

export default PictureInfo;
