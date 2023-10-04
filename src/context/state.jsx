import React, { useEffect, useState } from "react";
import axios from "axios";
import cookie from "react-cookies";

export const StateContext = React.createContext();

export default function State(props) {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const authToken = cookie.load("auth");
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
  }, []);

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

  const state = {
    posts: posts,
    comments: comments,
    likes: likes,
    addPost: addPost,
    deletePost: deletePost,
    editPost: editPost,
    addComment: addComment,
    deleteComment: deleteComment,
    editComments: editComments,

    addLike: addLike,
    deleteLike: deleteLike,
  };

  return (
    <StateContext.Provider value={state}>
      {props.children}
    </StateContext.Provider>
  );
}
