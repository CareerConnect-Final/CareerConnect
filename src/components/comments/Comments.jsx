import { useContext, useState } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/auth/authContext";
import { StateContext } from "../../context/state";

import cookie from "react-cookies";

import axios from "axios";
const Comments = (props) => {
  const user = cookie.load("user");

  const newComments = useContext(StateContext);

  const [newComment, setNewComment] = useState("");
  console.log(props.id);
  const addNewComment = () => {
    console.log("HELLO");
    const obj = {
      profilePicture: user.profilePicture,
      user_id: user.id,
      post_id: props.id,
      content: newComment,
    };
    axios
      .post("https://final-backend-nvf1.onrender.com/api/v1/comments", obj)
      .then((data) => {
        setNewComment("");
        newComments.addComment(data.data);
      })
      .catch((error) => {
        console.error("Error creating post:", error);
      });
  };
  return (
    <div className="comments">
      <div className="write">
        <img src={user.profilePicture} alt="" />
        <input
          type="text"
          placeholder="write a comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={addNewComment}>Send</button>
      </div>
      {props.comments.map((comment, idx) => {
        if (comment.post_id === props.id) {
          return (
            <div className="comment" key={idx}>
              <img src={comment.profilePicture} alt="" />
              <div className="info">
                <span>{comment.username}</span>
                <p>{comment.content}</p>
              </div>
              <span className="date">1 hour ago</span>
            </div>
          );
        }
      })}
    </div>
  );
};

export default Comments;
