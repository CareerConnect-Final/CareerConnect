import Post from "../post/Post";
import "./posts.scss";
import { useContext } from "react";
import  {StateContext}  from "../../context/state";
// import { useContext, useEffect ,useState} from "react";


const Posts = () => {




  const state=useContext(StateContext)

  return <div className="posts">

     {state.posts.map(post=>(
      <Post post={post} key={post.id}/>
    ))}
  </div>;
};

export default Posts;
