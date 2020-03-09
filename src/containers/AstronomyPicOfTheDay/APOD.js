import React, { useState, useEffect } from "react";
import DateForm from "../../components/DateForm/DateForm";
import PictureInfo from "../../components/PictureInfo/PictureInfo";
import classes from "./APOD.module.css";

const APOD = props => {
  const [picture, setPicture] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [copyRight, setCopyright] = useState("");

  const [year, handleYearChange] = useState("");
  const [month, handleMonthChange] = useState("");
  const [day, handleDayChange] = useState("");
  const [date, handleDateChange] = useState(new Date());
  let dateBuilder = [];

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(true);

  useEffect(() => {
    getPictureOfTheDay(true);
  }, []);

  const getPictureOfTheDay = (showToday, d) => {
    let url =
      "https://api.nasa.gov/planetary/apod?api_key=kvrxQ3qubIwJq4LxYXvFeer9WgfGn8ngDH9e2snK";

    if (!showToday) {
      url = `https://api.nasa.gov/planetary/apod?date=${d}&api_key=kvrxQ3qubIwJq4LxYXvFeer9WgfGn8ngDH9e2snK`;
    }
    try {
      console.log("start load");
      setLoading(true);
      fetch(url)
        .then(response => {
          return response.json();
        })
        .then(data => {
          //wrap this in try catch
          setPicture(data.url);
          setTitle(data.title);
          setDesc(data.explanation);
          handleDateChange(data.date);
          setCopyright(data.copyright);
          let d = data.date.split("-");
          handleYearChange(d[0]);
          handleMonthChange(d[1]);
          handleDayChange(d[2]);
          setSuccess(true);
          setLoading(false);
        });
    } catch (err) {
      console.log("fetch error");
      setLoading(false);
    }
  };

  const handleSubmit = event => {
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
    getPictureOfTheDay(false, dateBuilder.join("-"));
  };

  return (
    <div className={classes.APOD}>
      <h1>Astronomy Picture of the Day</h1>
      <DateForm
        getPictureOfTheDay={getPictureOfTheDay}
        handleSubmit={handleSubmit}
        month={month}
        handleMonthChange={handleMonthChange}
        day={day}
        handleDayChange={handleDayChange}
        year={year}
        handleYearChange={handleYearChange}
        date={date}
        handleDateChange={handleDateChange}
      />
      <PictureInfo
        title={title}
        date={date}
        desc={desc}
        picture={picture}
        copyRight={copyRight}
        loading={loading}
        setLoading={setLoading}
      />
    </div>
  );
};

export default APOD;
