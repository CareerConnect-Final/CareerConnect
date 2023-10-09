import React, { useEffect, useState } from "react";
import axios from "axios";
import cookie from "react-cookies";
export const StateContext = React.createContext();
export default function State(props) {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [myFriends, setMyFriends] = useState([]);
  const [allUsers, setallUsers] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [userPosts,setUserPosts]=useState([])
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
      window.location.reload();
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
      window.location.reload();
    } catch (error) {
      console.error("Error declining friend request:", error);
    }
  };

  // const fetchData=()=>{

  // }
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
  //         console.log("data come come ")
  //         setFollowers(response.data);
  //       })
  //       .catch((error) => {
  //         setError(error);
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
  //         setallUsers(response.data);
  //       })
  //       .catch((error) => {
  //         setError(error);
  //       });
  //     }

  //   if (authToken === null) {
  //     throw new Error("Authentication token not found.");
  //   } else if (authToken != null) {
  //     const headers = {
  //       Authorization: `Bearer ${authToken}`,
  //     };
  //     axios
  //       .get("https://final-backend-nvf1.onrender.com/home/posts", { headers })
  //       .then((response) => {
  //         setPosts(response.data);
  //       })
  //       .catch((error) => {
  //         setError(error);
  //       });
  //     axios
  //       .get("https://final-backend-nvf1.onrender.com/home/received-friend-requests", {
  //         headers,
  //       })
  //       .then((response) => {
  //         setFriendRequests(response.data);
  //       })
  //       .catch((error) => {
  //         setError(error);
  //       });
  //     axios
  //       .get("https://final-backend-nvf1.onrender.com/home/myfriends", {
  //         headers,
  //       })
  //       .then((response) => {
  //         setMyFriends(response.data);
  //       })
  //       .catch((error) => {
  //         setError(error);
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
  //         setLikes(response.data);
  //       })
  //       .catch((error) => {
  //         setError(error);
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
  //         setComments(response.data);
  //       })
  //       .catch((error) => {
  //         setError(error);
  //       });
  //   }
  // }, []);

  const resetState = () => {
    setPosts([]);
    setComments([]);
    setLikes([]);
    setFriendRequests([]);
    setMyFriends([]);
    setallUsers([]);
    setFollowers([]);
    setUserPosts([])
    setLoading(true);

    setError(null);
  };

  const addPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const addLike = (newLike) => {
    setLikes([newLike, ...likes]);
  };
  const addComment = (newComment) => {
    setComments([newComment, ...comments]);
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
  const editComments = (editedcomment) => {
    setComments((prevComment) => {
      return prevComment.map((comment) => {
        if (comment.id === editedcomment.id) {
          return editedcomment;
        }
        return comment;
      });
    });
  };
  const deletePost = (id) => {
    let newPosts = state.posts.filter((item) => item.id != id);
    setPosts(newPosts);
  };
  const deleteComment = (id) => {
    let newComments = state.comments.filter((item) => item.id != id);
    setComments(newComments);
  };
  const deleteLike = (id) => {
    let newLikes = state.likes.filter((item) => item.id != id);
    setLikes(newLikes);
  };
console.log(userPosts)
  const state = {
    posts: posts,
    setPosts: setPosts,
    comments: comments,
    setComments: setComments,
    likes: likes,
    setLikes: setLikes,
    followers: followers,
    setFollowers: setFollowers,
    addPost: addPost,
    friendRequests: friendRequests,
    setFriendRequests: setFriendRequests,
    allUsers: allUsers,
    setallUsers: setallUsers,
    deletePost: deletePost,
    userPosts:userPosts,
    setUserPosts:setUserPosts,
    editPost: editPost,
    acceptFriendRequest,
    declineFriendRequest,
    myFriends: myFriends,
    setMyFriends: setMyFriends,
    deleteLike: deleteLike,
    deleteComment: deleteComment,
    editComments: editComments,
    addComment: addComment,
    addLike: addLike,
    setError: setError,
    resetState: resetState,
  };
  return (
    <StateContext.Provider value={state}>
      {props.children}
    </StateContext.Provider>
  );
}
