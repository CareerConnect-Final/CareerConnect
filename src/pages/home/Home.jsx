import Stories from "../../components/stories/Stories"
import Posts from "../../components/posts/Posts"
import Share from "../../components/share/Share"
import { StateContext } from "../../context/state"
import "./home.scss"
import { useContext ,useEffect} from "react"
import axios from "axios"
import cookie from "react-cookies";
// import { useParams } from "react-router-dom"




const Home = () => {
  // const {userId}= useParams()
  // console.log(userId)

  const authToken = cookie.load("auth");
  const state=useContext(StateContext)
  useEffect(() => {
    if (authToken === null) {
      throw new Error("Authentication token not found.");
    } else if (authToken != null) {
      const headers = {
        Authorization: `Bearer ${authToken}`,
      };
      axios
        .get("https://final-backend-nvf1.onrender.com/home/followers", {
          headers,
        })
        .then((response) => {
          // console.log("data come comeeeeeeee ")
          state.setFollowers(response.data);
        })
        .catch((error) => {
          state.setError(error);
        });
      }
   
    if (authToken === null) {
      throw new Error("Authentication token not found.");
    } else if (authToken != null) {
      const headers = {
        Authorization: `Bearer ${authToken}`,
      };
      axios
        .get("https://final-backend-nvf1.onrender.com/home/users", { headers })
        .then((response) => {
          // console.log("hellooo data is here")
          state.setallUsers(response.data);
        })
        .catch((error) => {
          state.setError(error);
        });
      }

    if (authToken === null) {
      throw new Error("Authentication token not found.");
    } else if (authToken != null) {
      const headers = {
        Authorization: `Bearer ${authToken}`,
      };
      axios
        .get("https://final-backend-nvf1.onrender.com/home/homeposts", { headers })
        .then((response) => {
          state.setPosts(response.data);
        })
        .catch((error) => {
          state.setError(error);
        });
      axios
        .get("https://final-backend-nvf1.onrender.com/home/received-friend-requests", {
          headers,
        })
        .then((response) => {
          state.setFriendRequests(response.data);
        })
        .catch((error) => {
          state.setError(error);
        });
      axios
        .get("https://final-backend-nvf1.onrender.com/home/myfriends", {
          headers,
        })
        .then((response) => {
          state.setMyFriends(response.data);
        })
        .catch((error) => {
          state.setError(error);
        });
     
    }

    if (authToken === null) {
      throw new Error("Authentication token not found.");
    } else if (authToken != null) {
      const headers = {
        Authorization: `Bearer ${authToken}`,
      };

      axios
        .get(`https://final-backend-nvf1.onrender.com/home/users/1`, {
          headers,
        })
        .then((response) => {
          state.setUserProfile(response.data);
        })
        .catch((error) => {
          setError(error);
        });
    }
    
    if (authToken === null) {
      throw new Error("Authentication token not found.");
    } else if (authToken != null) {
      const headers = {
        Authorization: `Bearer ${authToken}`,
      };
      axios
        .get("https://final-backend-nvf1.onrender.com/home/likes", { headers })
        .then((response) => {
          state.setLikes(response.data);
        })
        .catch((error) => {
          state.setError(error);
        });
    }
    if (authToken === null) {
      throw new Error("Authentication token not found.");
    } else if (authToken != null) {
      const headers = {
        Authorization: `Bearer ${authToken}`,
      };
      axios
        .get("https://final-backend-nvf1.onrender.com/home/comments", {
          headers,
        })
        .then((response) => {
          state.setComments(response.data);
        })
        .catch((error) => {
          state.setError(error);
        });
    }
    
    // if (authToken === null) {
    //   throw new Error("Authentication token not found.");
    // } else if (authToken != null) {
    //   const headers = {
    //     Authorization: `Bearer ${authToken}`,
    //   };
    //   axios
    //   .get(`https://final-backend-nvf1.onrender.com/home/userposts/1`, {
    //     headers,
    //   })
    //   .then((response) => {
    //     state.setUserPosts(response.data);
    //   })
    //   .catch((error) => {
    //     setError(error);
    //   });
    // }
  }, [authToken]);


  return (
  

    <div className="home">
      
      <Stories/>
      <Share/>
      <Posts/>
    </div>
  )
}

export default Home