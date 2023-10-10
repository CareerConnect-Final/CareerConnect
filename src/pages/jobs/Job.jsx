// import Stories from "../../components/stories/Stories"
import JobPosts from "../../components/JobPosts/jobPosts";
import Share from "../../components/shareJob/ShareJob";
import JobSearch from "../../components/JobSearch/JobSearch";
import "./job.scss";
import { useEffect, useContext } from "react";
import axios from "axios";
import { JobContext } from "../../context/stateJob";
import cookie from "react-cookies";

const JobPage = () => {
  const user = cookie.load("user");
  const authToken = cookie.load("auth");
  const state = useContext(JobContext);
  useEffect(() => {
    if (authToken === null) {
      throw new Error("Authentication token not found.");
    } else if (authToken != null) {
      const headers = {
        Authorization: `Bearer ${authToken}`,
      };

      axios
        .get("https://final-backend-nvf1.onrender.com/home/friendsreq", {
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
        .get("https://final-backend-nvf1.onrender.com/careerjob/followdcompanies", {
          headers,
        })
        .then((response) => {
          console.log("data come comeeeeeeee ")
          state.setYouFollow(response.data);
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
        .get("https://final-backend-nvf1.onrender.com/careerjob/likes", {
          headers,
        })
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
        .get("https://final-backend-nvf1.onrender.com/home/jobcomments", {
          headers,
        })
        .then((response) => {
          state.setComments(response.data);
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
        .get("https://final-backend-nvf1.onrender.com/careerjob/jobs", {
          headers,
        })
        .then((response) => {
          state.setJobPosts(response.data);
          // console.log(response.data);
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
          // console.log("job users from job job ")
          state.setAllUsers(response.data);
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
          .get("https://final-backend-nvf1.onrender.com/home/followers", {
            headers,
          })
          .then((response) => {
            // console.log("data come comeeeeeeee ")
            state.setFollowers(response.data);
            // console.log(state.followers)
          })
          .catch((error) => {
            state.setError(error);
          });
        }

   
  }, []);

  return (
    <div className="home">
      {/* <Stories/> */}
      {user.role === "company" &&
      (<>
            <Share />
            <JobPosts />
        </>
      )
      }
      {user.role !== "company" &&
            <JobSearch />
      }
    </div>
  );
};

export default JobPage;
