import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useContext } from "react";
import { AuthContext } from "../../context/auth/authContext";
import { StateContext } from "../../context/state";
import { useState } from "react";
import axios from "axios";
import cookie from "react-cookies";

const Share = () => {
  const newPost = useContext(StateContext);
  const [postContent, setPostContent] = useState("");
 const user=cookie.load("user")
  const handleAdd = () => {
    const obj = {
      user_id: user.id,
      username: user.firstName,
      content: postContent,
      profilePicture:user.profilePicture
    };

    axios
      .post("https://final-backend-nvf1.onrender.com/api/v1/posts", obj)
      .then((data) => {
        setPostContent("");
        newPost.addPost(data.data);
      })
      .catch((error) => {
        console.error("Error creating post:", error);
      });
  };

  const { currentUser } = useContext(AuthContext);
  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <img src={user.profilePicture} alt="" />
          <input
            type="text"
            placeholder={`What's on your mind ${currentUser.name}?`}
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
          />
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input type="file" id="file" style={{ display: "none" }} />
            <label htmlFor="file">
              <div className="item">
                <img src={user.profilePicture} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handleAdd}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
