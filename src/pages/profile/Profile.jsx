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
import { StateContext } from "../../context/state";
import Posts from "../../components/posts/Posts";
import { useContext, useEffect, useState } from "react";
import Post from "../../components/post/Post";
const userAPI = "https://final-backend-nvf1.onrender.com/profile";
const userPostsAPI = "https://final-backend-nvf1.onrender.com/home/userposts/2";
// const userPostsAPI= "https://final-backend-nvf1.onrender.com/api/v1/users/2/posts"
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import cookie from "react-cookies";
import { AuthContext } from "../../context/auth/authContext";
import { useParams } from "react-router-dom";
import { JobContext } from "../../context/stateJob";

const Profile = () => {
  const state=useContext(StateContext)
  const { userId } = useParams();
  const cookieToken = cookie.load("auth");
  const cookieUser = cookie.load("user"); // this is not a good practice
  const token = cookieToken;
  const user = cookieUser;
  // console.log("user from cookie", user);

  // const location = useLocation().pathname;
  // const [pageType, setPageType] = useState(location);
  // console.log(pageType);
  const { currentUser, getUserPosts } = useContext(AuthContext);
  const [userPosts, setUserPosts] = useState([]);

 const authToken = cookie.load("auth");

  useEffect(() => {
    if (authToken === null) {
      throw new Error("Authentication token not found.");
    } else if (authToken != null) {
      const headers = {
        Authorization: `Bearer ${authToken}`,
      };
      axios
        .get(`https://final-backend-nvf1.onrender.com/home/userposts/${userId}`, { headers })
        .then((response) => {
          state.setUserPosts(response.data);
        })
        .catch((error) => {
          state.setError(error);
        });
    }
  }, [userId, authToken]); 
  // useEffect(() => {
  //   if (authToken === null) {
  //     throw new Error("Authentication token not found.");
  //   } else if (authToken != null) {
  //     const headers = {
  //       Authorization: `Bearer ${authToken}`,
  //     };
  //     axios
  //       .get("https://final-backend-nvf1.onrender.com/home/followers", {
  //         headers,
  //       })
  //       .then((response) => {
  //         console.log("data come comeeeeeeee ")
  //         state.setFollowers(response.data);
  //       })
  //       .catch((error) => {
  //         state.setError(error);
  //       });
  //     }
   
  //   if (authToken === null) {
  //     throw new Error("Authentication token not found.");
  //   } else if (authToken != null) {
  //     const headers = {
  //       Authorization: `Bearer ${authToken}`,
  //     };
  //     axios
  //       .get("https://final-backend-nvf1.onrender.com/home/users", { headers })
  //       .then((response) => {
  //         console.log("hellooo data is here")
  //         state.setallUsers(response.data);
  //       })
  //       .catch((error) => {
  //         state.setError(error);
  //       });
  //     }

  //   if (authToken === null) {
  //     throw new Error("Authentication token not found.");
  //   } else if (authToken != null) {
  //     const headers = {
  //       Authorization: `Bearer ${authToken}`,
  //     };
  //     axios
  //       .get("https://final-backend-nvf1.onrender.com/home/homeposts", { headers })
  //       .then((response) => {
  //         state.setPosts(response.data);
  //       })
  //       .catch((error) => {
  //         state.setError(error);
  //       });
  //     axios
  //       .get("https://final-backend-nvf1.onrender.com/home/received-friend-requests", {
  //         headers,
  //       })
  //       .then((response) => {
  //         state.setFriendRequests(response.data);
  //       })
  //       .catch((error) => {
  //         state.setError(error);
  //       });
  //     axios
  //       .get("https://final-backend-nvf1.onrender.com/home/myfriends", {
  //         headers,
  //       })
  //       .then((response) => {
  //         state.setMyFriends(response.data);
  //       })
  //       .catch((error) => {
  //         state.setError(error);
  //       });
     
  //   }
  //   if (authToken === null) {
  //     throw new Error("Authentication token not found.");
  //   } else if (authToken != null) {
  //     const headers = {
  //       Authorization: `Bearer ${authToken}`,
  //     };
  //     axios
  //       .get("https://final-backend-nvf1.onrender.com/home/likes", { headers })
  //       .then((response) => {
  //         state.setLikes(response.data);
  //       })
  //       .catch((error) => {
  //         state.setError(error);
  //       });
  //   }
  //   if (authToken === null) {
  //     throw new Error("Authentication token not found.");
  //   } else if (authToken != null) {
  //     const headers = {
  //       Authorization: `Bearer ${authToken}`,
  //     };
  //     axios
  //       .get("https://final-backend-nvf1.onrender.com/home/comments", {
  //         headers,
  //       })
  //       .then((response) => {
  //         state.setComments(response.data);
  //       })
  //       .catch((error) => {
  //         state.setError(error);
  //       });
  //   }
  // }, [authToken]);
  const stateJob = useContext(JobContext);
  // useEffect(() => {
  //   if (authToken === null) {
  //     throw new Error("Authentication token not found.");
  //   } else if (authToken != null) {
  //     const headers = {
  //       Authorization: `Bearer ${authToken}`,
  //     };

  //     axios
  //       .get("https://final-backend-nvf1.onrender.com/home/friendsreq", {
  //         headers,
  //       })
  //       .then((response) => {
  //         stateJob.setFriendRequests(response.data);
  //       })
  //       .catch((error) => {
  //         stateJob.setError(error);
  //       });

  //     axios
  //       .get("https://final-backend-nvf1.onrender.com/home/myfriends", {
  //         headers,
  //       })
  //       .then((response) => {
  //         stateJob.setMyFriends(response.data);
  //       })
  //       .catch((error) => {
  //         stateJob.setError(error);
  //       });
  //   }
  //   if (authToken === null) {
  //     throw new Error("Authentication token not found.");
  //   } else if (authToken != null) {
  //     const headers = {
  //       Authorization: `Bearer ${authToken}`,
  //     };
  //     axios
  //       .get("https://final-backend-nvf1.onrender.com/careerjob/followdcompanies", {
  //         headers,
  //       })
  //       .then((response) => {
  //         console.log("data come comeeeeeeee ")
  //         stateJob.setYouFollow(response.data);
  //       })
  //       .catch((error) => {
  //         stateJob.setError(error);
  //       });
  //     }

  //   if (authToken === null) {
  //     throw new Error("Authentication token not found.");
  //   } else if (authToken != null) {
  //     const headers = {
  //       Authorization: `Bearer ${authToken}`,
  //     };

  //     axios
  //       .get("https://final-backend-nvf1.onrender.com/careerjob/likes", {
  //         headers,
  //       })
  //       .then((response) => {
  //         stateJob.setLikes(response.data);
  //       })
  //       .catch((error) => {
  //         stateJob.setError(error);
  //       });
  //   }
  //   if (authToken === null) {
  //     throw new Error("Authentication token not found.");
  //   } else if (authToken != null) {
  //     const headers = {
  //       Authorization: `Bearer ${authToken}`,
  //     };

  //     axios
  //       .get("https://final-backend-nvf1.onrender.com/home/jobcomments", {
  //         headers,
  //       })
  //       .then((response) => {
  //         stateJob.setComments(response.data);
  //       })
  //       .catch((error) => {
  //         stateJob.setError(error);
  //       });
  //   }
  //   if (authToken === null) {
  //     throw new Error("Authentication token not found.");
  //   } else if (authToken != null) {
  //     const headers = {
  //       Authorization: `Bearer ${authToken}`,
  //     };

  //     axios
  //       .get("https://final-backend-nvf1.onrender.com/careerjob/jobs", {
  //         headers,
  //       })
  //       .then((response) => {
  //         stateJob.setJobPosts(response.data);
  //         // console.log(response.data);
  //       })
  //       .catch((error) => {
  //         stateJob.setError(error);
  //       });
  //   }
  //   if (authToken === null) {
  //     throw new Error("Authentication token not found.");
  //   } else if (authToken != null) {
  //     const headers = {
  //       Authorization: `Bearer ${authToken}`,
  //     };
  //     axios
  //       .get("https://final-backend-nvf1.onrender.com/home/users", { headers })
  //       .then((response) => {
  //         // console.log("job users from job job ")
  //         stateJob.setAllUsers(response.data);
  //       })
  //       .catch((error) => {
  //         stateJob.setError(error);
  //       });
  //     }
  //     if (authToken === null) {
  //       throw new Error("Authentication token not found.");
  //     } else if (authToken != null) {
  //       const headers = {
  //         Authorization: `Bearer ${authToken}`,
  //       };
  //       axios
  //         .get("https://final-backend-nvf1.onrender.com/home/followers", {
  //           headers,
  //         })
  //         .then((response) => {
  //           // console.log("data come comeeeeeeee ")
  //           stateJob.setFollowers(response.data);
  //           // console.log(state.followers)
  //         })
  //         .catch((error) => {
  //           stateJob.setError(error);
  //         });
  //       }

   
  // }, []);
  // useEffect(() => {
  //   if (currentUser.id) {
  //     getUserPosts(currentUser.id)
  //       .then((posts) => {
  //         setUserPosts(posts);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching user posts:", error);
  //       });
  //   }
  // }, [currentUser.id, getUserPosts]); // this to get the new posts if added

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
            <MoreVertIcon />
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
            <span>
              {user.firstName} {user.lastName}
            </span>
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
        {/* <Posts  check="userposts"/> */}

        {state.userPosts.map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </div>
      ;
    </div>
  );
};

export default Profile;
