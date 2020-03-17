import React from "react";
import classes from "./RoverInfo.module.css";

const RoverInfo = props => {

  if(props.loading) {
    return (
      <h1>Loading...</h1>
    )
  }


  return props.data.map(data => (
    <div className={classes.card}>
      <img src={data.img_src} alt="N/A"/>
      <p>ID: {data.id}</p>
      <div className={classes.container}>
        <h2>{data.earth_date}</h2>
        <p>
          {data.rover.name} - {data.camera.full_name} ({data.camera.name})
        </p>
      </div>
    </div>
  ));
};

export default RoverInfo;
