import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/auth/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import {StateContext} from "../../context/state";
import { JobContext } from "../../context/stateJob";

const Navbar = () => {
  const state=useContext(StateContext)
  const stateJob=useContext(JobContext)
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  // Function to handle sign out
  const handleSignOut = async () => {
    try {


  stateJob.resetStateJob()
  state.resetState()

      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://final-backend-nvf1.onrender.com/home/users`
      );

      setUsers(response.data);
      users.map((user)=>
       console.log(user.username)
      )
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>CareerConnect</span>
        </Link>
        <HomeOutlinedIcon />
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} />
        )}
        <WorkOutlineIcon/>
        {/* <GridViewOutlinedIcon /> */}
        <div className="search">
          <SearchOutlinedIcon onClick={handleSearch} />
      
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="right">
        <PersonOutlinedIcon />
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        <div className="user">
          <img src={currentUser.profilePic} alt="" />
          <span>{currentUser.name}</span>
        </div>
        <button onClick={handleSignOut}>Sign Out</button>{" "}
      </div>
    </div>
  );
};

export default Navbar;
