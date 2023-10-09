import "./jobsearch.scss";
import { useContext } from "react";
import { AuthContext } from "../../context/auth/authContext";
import { JobContext } from "../../context/stateJob";
import { useState } from "react";
import axios from "axios";
import cookie from "react-cookies";
/////////////////////////////////////firebase//
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "../../firebase";
import { v4 } from "uuid";
///////////////////////////////////
const JobSearch = () => {
  const filter = useContext(JobContext);

  const [searchBasedOn, setSearchBasedOn] = useState("Title"); 
  const [selectedTitle, setSelectedTitle] = useState(""); 
  const [selectedCity, setSelectedCity] = useState(""); 

  const user = cookie.load("user");
  const authToken = cookie.load("auth");

  const handleSearch = () => {
    if(selectedTitle !== "" && selectedCity == ""){
      if (authToken === null) {
        throw new Error("Authentication token not found.");
      } else if (authToken != null) {
        const headers = {
          Authorization: `Bearer ${authToken}`,
        };
        axios
          .get(`https://final-backend-nvf1.onrender.com/careerjob/jobtitle/${selectedTitle}`, { headers })
          .then((response) => {
            filter.setJobSearch(response.data);
          })
          .catch((error) => {
            setError(error);
          });
        setSelectedCity("");
        setSelectedTitle("");
      }

    } else if (selectedTitle == "" && selectedCity !== ""){
      if (authToken === null) {
        throw new Error("Authentication token not found.");
      } else if (authToken != null) {
        const headers = {
          Authorization: `Bearer ${authToken}`,
        };
        axios
          .get(`https://final-backend-nvf1.onrender.com/careerjob/jobcity/${selectedCity}`, { headers })
          .then((response) => {
            filter.setJobSearch(response.data);
          })
          .catch((error) => {
            setError(error);
          });
        setSelectedCity("");
        setSelectedTitle("");
      }
    }

      
  };


  const handleSearchBasedOn = (event) => {
    setSearchBasedOn(event.target.value);
  };
  const handleSelectedTitle = (event) => {
    setSelectedTitle(event.target.value);
    setSelectedCity("");
  };
  const handleSelectedCity = (event) => {
    setSelectedCity(event.target.value);
    setSelectedTitle("");
  };

  return (
    <div className="share">
      {user.role !== "company" && (
        <div className="container">
          <div className="top">
            {/* <img src={user.profilePicture} alt="" /> */}
            <form>
              <div className="jobsearch-card">
                <label htmlFor="dropdown">Filter by:</label>
                <select
                  id="dropdown"
                  value={searchBasedOn}
                  onChange={handleSearchBasedOn}
                >
                  <option value="Title">Title</option>
                  <option value="City">City</option>
                </select>
                {searchBasedOn == "Title" && (
                  <div>
                    <label htmlFor="dropdown">Select Job Title:</label>
                    <select
                      id="dropdown"
                      value={selectedTitle}
                      onChange={handleSelectedTitle}
                    >
                      <option value="option1"></option>
                      <option value="option2">Option 1</option>
                      <option value="option3">Option 2</option>
                      <option value="option4">Option 3</option>
                    </select>
                  </div>
                )}
                {searchBasedOn == "City" && (
                  <div>
                    <label htmlFor="dropdown">Select City:</label>
                    <select
                      id="dropdown"
                      value={selectedCity}
                      onChange={handleSelectedCity}
                    >
                      <option value="option1"></option>
                      <option value="option2">Option 1</option>
                      <option value="option3">Option 2</option>
                      <option value="option4">Option 3</option>
                    </select>
                  </div>
                )}
              </div>
            </form>
          </div>
          <hr />
          <div className="bottom">
            <div className="right">
              <button onClick={handleSearch}>Search</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobSearch;
