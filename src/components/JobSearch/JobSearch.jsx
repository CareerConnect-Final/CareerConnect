import React, { useContext, useEffect, useState } from "react";

const JobSearch = () => {
  const [searchBasedOn, setSearchBasedOn] = useState("Title"); // Set a default value
  const [selectedTitle, setSelectedTitle] = useState("option1"); // Set a default value
  const [selectedCity, setSelectedCity] = useState(""); // Set a default value

  const handleSearchBasedOn = (event) => {
    setSearchBasedOn(event.target.value);
  };
  const handleSelectedTitle = (event) => {
    setSelectedTitle(event.target.value);
  };
  const handleSelectedCity = (event) => {
    setSelectedCity(event.target.value);
  };

  return (
    <form>
      <div>
        <label htmlFor="dropdown">Select an Option:</label>
        <select
          id="dropdown"
          value={searchBasedOn}
          onChange={handleSearchBasedOn}
        >
          <option value="Title">Title</option>
          <option value="City">City</option>
        </select>
        {searchBasedOn == "Title" && (
          <span>
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
          </span>
        )}
        {/* <label htmlFor="dropdown">Select an Option:</label>
          <select id="dropdown" value={selectedOption} onChange={handleDropdownChange}>
            <option value="option1"></option>
            <option value="option2">Option 1</option>
            <option value="option3">Option 2</option>
            <option value="option4">Option 3</option>
          </select> */}
        {searchBasedOn == "City" && (
          <span>
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
          </span>
        )}
      </div>
      {/* Add other form elements and submit button if needed */}
    </form>
  );
};

export default JobSearch;
