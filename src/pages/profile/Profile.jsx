import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import Posts from "../../components/posts/Posts";
import { useContext, useEffect, useState } from "react";
import Post from "../../components/post/Post";
const userAPI = "https://final-backend-nvf1.onrender.com/profile";
import { StateContext } from "../../context/state";

import { useLocation, useNavigate } from "react-router-dom";
import cookie from "react-cookies";

const Profile = () => {
  const state = useContext(StateContext);
  


    const cookieToken = cookie.load("auth");
    const cookieUser = cookie.load("user"); // this is not a good practice
    const token =  cookieToken ;
    const user =  cookieUser ;
    
    
    
    const location = useLocation().pathname
    const [pageType, setPageType] = useState(location);
// console.log(pageType)
    
    


console.log("-------+++++>",state.userProfile)



  return (
    <div className="profile">
      <div className="images">
        <img
          src="https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
          className="cover"
        />
        <img
          src= {user.profilePicture || null}
          alt=""
          className="profilePic"
        />
      </div>
      <div className="profileContainer">
        {/* <div className="uInfo">
          <div className="top-right">
            <MoreVertIcon />
          </div>
          <div className="left">
            <a href="http://facebook.com">
            </a>
          </div>
          <div className="center">
            <span>
              {user.firstName} {user.lastName}
            </span>

                <div>{user.bio}</div>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>{user.city}</span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span>{user.career}</span>
              </div>
            </div>
            <button>follow</button>
          </div>
          <div className="right">
            <EmailOutlinedIcon />
          </div>

        </div> */}



        <div className="uInfo">
          <div className="top">
            <button>follow</button>
            <MoreVertIcon />
          </div>
          <div className="user-career">
           <div>
            <span>
              {user.firstName} {user.lastName}
            </span>
           </div>
            <div>{user.career}</div>
          </div>

          <div className="bio">
           <div>{user.city}</div> 
          </div>
            <div className="contact-info">
              <div className="con-info">Contact Info:</div>
              <div className="contact-icons">
          <div><AlternateEmailOutlinedIcon/> {user.email}</div>
          <div><PermContactCalendarIcon/>{user.phoneNumber}</div>
              </div>
            </div>

        
          {/* <div className="right">
            <EmailOutlinedIcon />
          </div> */}

        </div>
        <div className="uInfo-bio" >
        <div>
          <div>About :</div>
          <button className="resume">Resume</button>
          </div>
          <div>{user.bio}</div>
          </div> 
    {state.userPosts.map(post=>(
      <Post  post={post} key={post.id}/>
        ))}

      </div>
      
    </div>
  );
};

export default Profile;