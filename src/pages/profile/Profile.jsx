import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts"
import { useContext, useEffect ,useState} from "react";

const userAPI= "https://final-backend-nvf1.onrender.com/profile"
const userPostsAPI= "https://final-backend-nvf1.onrender.com/home/userposts/2"
// const userPostsAPI= "https://final-backend-nvf1.onrender.com/api/v1/users/2/posts"

import cookie from "react-cookies";
import { AuthContext } from "../../context/auth/authContext";

const Profile = () => {



    const cookieToken = cookie.load("auth");
    const cookieUser = cookie.load("user"); // this is not a good practice
    const token =  cookieToken ;
    const user =  cookieUser ;
    console.log("user from cookie", user);

    const { currentUser, getUserPosts } = useContext(AuthContext);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
   
    if (currentUser.id) {
      getUserPosts(currentUser.id)
        .then((posts) => {
          setUserPosts(posts);
        })
        .catch((error) => {
          console.error("Error fetching user posts:", error);
        });
    }
  }, [currentUser.id, getUserPosts]); // this to get the new posts if added 


  return (
    <div className="profile">
      <div className="images">
        <img
          src="https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
          className="cover"
        />
        <img
          src="https://images.pexels.com/photos/14028501/pexels-photo-14028501.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
          alt=""
          className="profilePic"
        />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
        <div className="top-right">

< MoreVertIcon />
</div>
          <div className="left">
            <a href="http://facebook.com">
              {/* <FacebookTwoToneIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <InstagramIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <TwitterIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <LinkedInIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <PinterestIcon fontSize="large" /> */}
            </a>
          </div>
          <div className="center">
            <span>{user.firstName} {user.lastName}</span> 
            {/* <span></span> */}
                <div>{currentUser.bio}</div>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>{currentUser.city}</span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span>{currentUser.career}</span>
              </div>
            </div>
            <button>follow</button>
          </div>
          <div className="right">
            <EmailOutlinedIcon />
            
            
          </div>
              {/* <div className="top-right">

              < MoreVertIcon />
              </div> */}
        </div>
      <Posts currentUser={currentUser} userPosts={userPosts}  check="userposts"/>
      </div>
    </div>
  );
};

export default Profile;
