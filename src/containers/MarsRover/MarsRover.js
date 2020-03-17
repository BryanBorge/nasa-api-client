import React, { useState } from "react";
import RoverForm from "../../components/RoverForm/RoverForm";
import RoverInfo from "../../components/RoverInfo/RoverInfo";
import Pagination from "../../components/Pagination";
import axios from "axios";
import classes from "./MarsRover.module.css";

const MarsRover = props => {
  const [date, handleDateChange] = useState(new Date());
  const [year, handleYearChange] = useState("");
  const [month, handleMonthChange] = useState("");
  const [day, handleDayChange] = useState("");
  let dateBuilder = [];

  const [rover, setRover] = useState("");
  const [pictures, setPictures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(true);

  const [currentPage, setCurentPage] = useState(1);
  const [postsPerPage] = useState(30);

  const getRoverData = async (rover, d) => {
    setLoading(true);

    let url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?earth_date=${d}&api_key=kvrxQ3qubIwJq4LxYXvFeer9WgfGn8ngDH9e2snK`;

    await axios
      .get(url)
      .then(response => {
        if (response.data.photos.length > 1) {
          const newInfo = response.data.photos;
          setPictures(newInfo);
          setLoading(false);
          setSuccess(true);
        } else {
          setLoading(false);
          setSuccess(false);
          alert("No pictures found");
        }
      })
      .catch(err => {
        setSuccess(false);
        setLoading(false);
        alert("Error");
      });
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPost = pictures.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNumber => {
    setCurentPage(pageNumber);
  };

  const handleRoverChange = event => {
    setRover(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (rover.length === 0) {
      alert("Please select a rover");
      return;
    }
    dateBuilder = [];
    event.preventDefault();
    dateBuilder.push(year);
    if (month.length < 2) {
      dateBuilder.push("0" + month);
    } else {
      dateBuilder.push(month);
    }
    if (day.length < 2) {
      dateBuilder.push("0" + day);
    } else {
      dateBuilder.push(day);
    }
    getRoverData(rover, dateBuilder.join("-"));
  };

  return (
    <div>
      <RoverForm
        option1={"Curiosity"}
        option2={"Opportuniy"}
        option3={"Spirit"}
        handleSubmit={handleSubmit}
        handleRoverChange={handleRoverChange}
        month={month}
        handleMonthChange={handleMonthChange}
        day={day}
        handleDayChange={handleDayChange}
        year={year}
        handleYearChange={handleYearChange}
        date={date}
        handleDateChange={handleDateChange}
      />
      <div className={classes.roverInfo}>
        <RoverInfo data={currentPost} loading={loading} success={success}/>
      </div>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={pictures.length}
        paginate={paginate}
      />
    </div>
  );
};

export default MarsRover;
