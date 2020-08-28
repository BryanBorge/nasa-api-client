import React, {useState, useEffect} from "react";
import DateForm from "../../components/DateForm/DateForm";
import PictureInfo from "../../components/PictureInfo/PictureInfo";
import {Appbar} from "../../components/AppBar/Appbar";
import classes from "./APOD.module.css";
import {formatDate} from "../../util";
import axios from "axios";

const APOD = props => {
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

  const getPictureOfTheDay = async showToday => {
    setLoading(true);
    let date;

    if (showToday) {
      handleDateChange(new Date());
      date = formatDate(new Date());
    } else {
      date = formatDate(inputDate);
    }

    let url = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=kvrxQ3qubIwJq4LxYXvFeer9WgfGn8ngDH9e2snK`;

    await axios
      .get(url)
      .then(res => {
        setPicture(res.data.url);
        setTitle(res.data.title);
        setDesc(res.data.explanation);
        setPicDate(res.data.date);
        setCopyright(res.data.copyright);
        setLoading(false);
        setSuccess(true);
      })
      .catch(err => {
        alert("Date is not valid");
        handleDateChange(new Date());
        setLoading(false);
        setSuccess(false);
      });
  };

  const handleSubmit = event => {
    event.preventDefault();
    getPictureOfTheDay(false);
  };

  return (
    <div className={classes.APOD}>
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
