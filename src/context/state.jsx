import React, { useEffect, useState } from "react";
import axios from "axios";
import cookie from "react-cookies";

export const StateContext = React.createContext();

export default function State(props) {
  const [posts, setPosts] = useState([]);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const authToken = cookie.load("auth");
  useEffect(() => {
    if (authToken===null) {


      throw new Error("Authentication token not found.");
    }else if(authToken!=null){
      

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
   
  }, []);
  // useEffect(() => {
  //   if (!authToken) {
  //     throw new Error("Authentication token not found.");
  //   }
  //   const headers = {
  //     Authorization: `Bearer ${authToken}`,
  //   };

  //   axios
  //     .get("https://final-backend-nvf1.onrender.com/home/users", { headers })
  //     .then((response) => {
  //       setUserData(response.data);
  //     })
  //     .catch((error) => {
  //       setError(error);
  //     });
  // }, []);

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
// console.log(userData)
  const state = {
    posts: posts,
    // userData:userData,
    // comments: [],
    addPost: addPost,
    deletePost: deletePost,
    editPost: editPost,
  };

  return (
    <StateContext.Provider value={state}>
      {props.children}
    </StateContext.Provider>
  );
}
