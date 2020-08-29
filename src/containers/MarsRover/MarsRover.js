import React, {useState, useEffect} from "react";
import RoverForm from "../../components/RoverForm/RoverForm";
import RoverInfo from "../../components/RoverInfo/RoverInfo";
import Pagination from "../../components/Pagination";
import axios from "axios";
import {CollapsibleTable} from "./RoverTable";
import classes from "./MarsRover.module.css";

const MarsRover = props => {
  let roverNames = ["Curiosity", "Spirit", "Opportunity"];

  //State for input form
  const [rover, setRover] = useState("");
  const [sol, setSol] = useState("");
  const [camera, setCamera] = useState("");

  //State containing rover information
  const [rovers, setRovers] = useState([]);

  //State containing pictures from the query
  const [pictures, setPictures] = useState([]);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(true);

  const [currentPage, setCurentPage] = useState(1);
  const [postsPerPage] = useState(30);

  const getRoverInfo = () => {
    roverNames.map(rover => {
      axios
        .get(
          `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/?api_key=kvrxQ3qubIwJq4LxYXvFeer9WgfGn8ngDH9e2snK`
        )
        .then(response => {
          setRovers(prevState => [...prevState, response.data.rover]);
        })
        .catch(err => {
          setSuccess(false);
          setLoading(false);
          alert("Error");
        });
    });
  };

  //Load rover data to display in table
  useEffect(() => {
    getRoverInfo();
  }, []);

  const getRoverPictures = async () => {
    if (rover === "" || sol === "") {
      setLoading(false);
      alert("Choose and rover and sol to search");
      return;
    }
    setLoading(true);
    console.log(rover);
    console.log(sol);

    let url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&api_key=kvrxQ3qubIwJq4LxYXvFeer9WgfGn8ngDH9e2snK`;
    if (camera !== "All Cameras") {
      url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&camera=${camera}&api_key=kvrxQ3qubIwJq4LxYXvFeer9WgfGn8ngDH9e2snK`;
    }

    await axios
      .get(url)
      .then(response => {
        console.log(response);
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

  const handleSubmit = event => {
    event.preventDefault();
    getRoverPictures();
  };

  return (
    <div>
      <RoverForm
        rovers={rovers}
        rover={rover}
        setRover={setRover}
        sol={sol}
        setSol={setSol}
        camera={camera}
        setCamera={setCamera}
        handleSubmit={handleSubmit}
      />
      <div className={classes.container}>
        <CollapsibleTable rovers={rovers} />
      </div>
      <div className={classes.roverInfo}>
        <RoverInfo data={currentPost} loading={loading} success={success} />
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
