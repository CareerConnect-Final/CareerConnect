import React, { useEffect, useState } from "react";
import axios from "axios";
import cookie from "react-cookies";

export const StateContext = React.createContext();

export default function State(props) {
  const [posts, setPosts] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [myFriends, setMyFriends] = useState([]);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const authToken = cookie.load("auth");

  const acceptFriendRequest = async (receiver_id) => {
    try {
      
      const response = await axios.post(
        `https://final-backend-nvf1.onrender.com/home/handle-friend-request/${receiver_id}`,
        { action: "accept" },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      window.location.reload()
    } catch (error) {
      console.error("Error accepting friend request:", error);
    }
  };

  const declineFriendRequest = async (receiver_id) => {
    try {
      const url = `https://final-backend-nvf1.onrender.com/home/handle-friend-request/${receiver_id}`;
      console.log("Declining friend request. URL:", url);
  
      const response = await axios.post(
        url,
        { action: "decline" },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      window.location.reload()
    } catch (error) {
      console.error("Error declining friend request:", error);
    }
  };
  
  useEffect(() => {
    if (authToken === null) {
      throw new Error("Authentication token not found.");
    } else if (authToken != null) {
      const headers = {
        Authorization: `Bearer ${authToken}`,
      };

      axios
        .get("https://final-backend-nvf1.onrender.com/home/posts", { headers })
        .then((response) => {
          setPosts(response.data);
        })
        .catch((error) => {
          setError(error);
        });

      axios
        .get("https://final-backend-nvf1.onrender.com/home/friendsreq", { headers})
        .then((response) => {
          setFriendRequests(response.data);
        })
        .catch((error) => {
          setError(error);
        });

        axios
        .get("https://final-backend-nvf1.onrender.com/home/myfriends", { headers})
        .then((response) => {
          setMyFriends(response.data);
        })
        .catch((error) => {
          setError(error);
        }); 
    }
  }, []);


  const addPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };
  
  const editPost = (editedPost) => {
    setPosts((prevPosts) => {
      return prevPosts.map((post) => {
        if (post.id === editedPost.id) {
          return editedPost;
        }
        return post;
      });
    });
  };
  const deletePost = (id) => {
    let newPosts = state.posts.filter((item) => item.id != id);
    setPosts(newPosts);
  };


    const state = {
    posts: posts,
    addPost: addPost,
    friendRequests,
    deletePost: deletePost,
    editPost: editPost,
    acceptFriendRequest,
    declineFriendRequest,
    myFriends: myFriends,
  };

  return (
    <StateContext.Provider value={state}>
      {props.children}
    </StateContext.Provider>
  );
}
