import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useState, useContext } from "react";
import axios from "axios";
import { StateContext } from "../../context/state";
import PostModal from "../postModal/PostModal";
const Post = (props) => {
  const deletePost = useContext(StateContext);
  const [commentOpen, setCommentOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // const [remove, setRemove]= useState('')

  // console.log(props.post.user_id);
  // console.log(remove)
  //TEMPORARY
  const liked = false;
  const toggleMenu = () => {
    setShowMenu(!showMenu);
 
  };
  const handleShow = () => {
    setShowModal(true);
  };
  const handleClose  = () => {
    setShowModal(false);
    
  };
  const handleDelete = (id) => {
    axios
      .delete(`https://final-backend-nvf1.onrender.com/api/v1/posts/${id}`)
      .then(() => {
        deletePost.deletePost(id);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };
  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img
              src={
                "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600"
              }
              alt=""
            />
            <div className="details">
              <Link
                to={`/profile/${props.post.user_id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{props.post.username}</span>
              </Link>
              <span className="date">1 min ago</span>
            </div>
          </div>
          {props.post.user_id === 2 && (
            <div className="menu-container">
              <MoreHorizIcon onClick={toggleMenu} />
              {showMenu && (
                <div className="menu">
                  <div
                    className="menu-option"
                    style={{ color: "blue" }}
                    onClick={handleShow}
                  >
                    Edit
                  </div>
                  <div
                    className="menu-option"
                    style={{ color: "red" }}
                    onClick={() => handleDelete(props.post.id)}
                  >
                    Delete
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="content">
          <p>{props.post.content}</p>
          <img
            src={
              "https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
            }
            alt=""
          />
        </div>
        <div className="info">
          <div className="item">
            {liked ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
            12 Likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            12 Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {/* {console.log(commentOpen)} */}
        {commentOpen && <Comments />}
        {showModal && (
  <PostModal
  id={props.post.id}
  showFlag={showModal}
  handleclose={handleClose}
  />
)}
      </div>
    </div>
  );
};

export default Post;
