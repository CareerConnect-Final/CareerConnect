import React, { useEffect, useState } from "react";
import axios from "axios";

export const StateContext = React.createContext();

export default function State(props) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://final-backend-nvf1.onrender.com/api/v1/posts")
      .then((response) => {
        setPosts(response.data);
     
      })
      .catch((error) => {
        setError(error);
        
      });
  }, []);
  const addPost = (newPost) => {
    setPosts([newPost,...posts]);
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
   let newPosts=state.posts.filter((item)=>item.id!=id)
   setPosts(newPosts)
  };

  const state = {
    posts:posts,
    // comments: [],
    addPost:addPost,
    deletePost:deletePost,
    editPost:editPost,
  };

  return (
    <StateContext.Provider value={state}>
      {props.children}
    </StateContext.Provider>
  );
}