import React, { useEffect, useState } from "react";
import axios from "axios";
import cookie from "react-cookies";
export const StateContext = React.createContext();
export default function State(props) {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [reels, setReels] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [myFriends, setMyFriends] = useState([]);
  
  const [allUsers, setallUsers] = useState([]);
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
  useEffect(() => {
    if (authToken === null) {
      throw new Error("Authentication token not found.");
    } else if (authToken != null) {
      const headers = {
        Authorization: `Bearer ${authToken}`,
      };
      axios
        .get("https://final-backend-nvf1.onrender.com/home/users", { headers })
        .then((response) => {
          setallUsers(response.data);
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
        .get("https://final-backend-nvf1.onrender.com/home/posts", { headers })
        .then((response) => {
          setPosts(response.data);
        })
        .catch((error) => {
          setError(error);
        });
      // axios
      //   .get("https://final-backend-nvf1.onrender.com/home/received-friend-requests", {
      //     headers,
      //   })
      //   .then((response) => {
      //     setFriendRequests(response.data);
      //   })
      //   .catch((error) => {
      //     setError(error);
      //   });
      // axios
      //   .get("https://final-backend-nvf1.onrender.com/home/myfriends", {
      //     headers,
      //   })
      //   .then((response) => {
      //     setMyFriends(response.data);
      //   })
      //   .catch((error) => {
      //     setError(error);
      //   });
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
          setLikes(response.data);
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
        .get("https://final-backend-nvf1.onrender.com/home/comments", {
          headers,
        })
        .then((response) => {
          setComments(response.data);
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
        .get("https://final-backend-nvf1.onrender.com/home/reels", {
          headers,
        })
        .then((response) => {
          setReels(response.data);
        })
        .catch((error) => {
          setError(error);
        });
        
    }

    // .get("https://final-backend-nvf1.onrender.com/home/comments", { headers })
  }, []);

  // const addStory = (newPost) => {
  //   setPosts([newPost, ...posts]);
  // };

  const addReel = (newReel) => {///
    setReels([newReel, ...reels]);
    console.log("reels==>",reels)

  };
  const addPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };
  // const addFriend=(friend)=>{
  //   setFriendRequests([friend,...friendRequests])
  // }
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
  // const sendFriendRequest=()=>{

  // }
  // console.log(allUsers)
  // console.log(friendRequests)
  // console.log(myFriends)
  console.log(friendRequests)
  const state = {
    posts: posts,
    comments: comments,
    likes: likes,
    addReel:addReel,
    reels:reels,
    addPost: addPost,
    friendRequests:friendRequests,
    allUsers:allUsers,
    deletePost: deletePost,
    editPost: editPost,
    acceptFriendRequest,
    declineFriendRequest,
    myFriends: myFriends,
    deleteLike: deleteLike,
    deleteComment: deleteComment,
    editComments: editComments,
    addComment: addComment,
    addLike: addLike,
    // addFriend:addFriend,
  };
  return (
    <StateContext.Provider value={state}>
      {props.children}
    </StateContext.Provider>
  );
}