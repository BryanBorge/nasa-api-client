import React, { useState, useEffect } from "react";
import DateForm from "../../components/DateForm/DateForm";
import PictureInfo from "../../components/PictureInfo/PictureInfo";
import classes from "./APOD.module.css";
import axios from "axios";

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

  const getPictureOfTheDay = async (showToday, d) => {
    let url =
      "https://api.nasa.gov/planetary/apod?api_key=kvrxQ3qubIwJq4LxYXvFeer9WgfGn8ngDH9e2snK";

    if (!showToday) {
      url = `https://api.nasa.gov/planetary/apod?date=${d}&api_key=kvrxQ3qubIwJq4LxYXvFeer9WgfGn8ngDH9e2snK`;
    }

    await axios.get(url)
      .then(res => {
        setPicture(res.data.url);
        setTitle(res.data.title);
        setDesc(res.data.explanation);
        handleDateChange(new Date(res.data.date));
        setCopyright(res.data.copyright);
        let d = res.data.date.split("-");
        handleYearChange(d[0]);
        handleMonthChange(d[1]);
        handleDayChange(d[2]);
        setLoading(false);
        setSuccess(true);
      })
      .catch(err => {
        alert('Date is not valid')
      });
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
        apod={true}
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
      <p><i>Valid dates start June 16, 1995</i></p>
      <PictureInfo
        title={title}
        date={date}
        desc={desc}
        picture={picture}
        copyRight={copyRight}
        sucess={success}
        loading={loading}
        setLoading={setLoading}
      />
    </div>
  );
};

export default APOD
