import React, { useState, useEffect } from "react";
import DateForm from "../../components/DateForm/DateForm";
import PictureInfo from "../../components/PictureInfo/PictureInfo";
import classes from "./APOD.module.css";
import axios from "axios";

const APOD = (props) => {
  const [picture, setPicture] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [picDate, setPicDate] = useState("");
  const [copyRight, setCopyright] = useState("");

  const [inputDate, handleDateChange] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    getPictureOfTheDay(inputDate);
  }, []);

  const getPictureOfTheDay = async (showToday, d) => {
    setLoading(true);
    let url =
      "https://api.nasa.gov/planetary/apod?api_key=kvrxQ3qubIwJq4LxYXvFeer9WgfGn8ngDH9e2snK";

    if (!showToday) {
      url = `https://api.nasa.gov/planetary/apod?date=${d}&api_key=kvrxQ3qubIwJq4LxYXvFeer9WgfGn8ngDH9e2snK`;
    }

    await axios
      .get(url)
      .then((res) => {
        setPicture(res.data.url);
        setTitle(res.data.title);
        setDesc(res.data.explanation);
        setPicDate(res.data.date);
        setCopyright(res.data.copyright);
        setLoading(false);
        setSuccess(true);
      })
      .catch((err) => {
        alert("Date is not valid");
        setLoading(false);
        setSuccess(false);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getPictureOfTheDay(false, inputDate);
  };

  return (
    <div className={classes.APOD}>
      <h2>Astronomy Picture of the Day</h2>
      <DateForm
        getPictureOfTheDay={getPictureOfTheDay}
        handleSubmit={handleSubmit}
        date={inputDate}
        handleDateChange={handleDateChange}
      />
      <p>
        <i>Valid dates start June 16, 1995</i>
      </p>
      <PictureInfo
        title={title}
        date={picDate}
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

export default APOD;
