import "./leftBar.scss";
import Friends from "../../assets/1.png";
import Groups from "../../assets/2.png";
import Market from "../../assets/3.png";
import Watch from "../../assets/4.png";
import Memories from "../../assets/5.png";
import Events from "../../assets/6.png";
import Gaming from "../../assets/7.png";
import Gallery from "../../assets/8.png";
import Videos from "../../assets/9.png";
import Messages from "../../assets/10.png";
import Tutorials from "../../assets/11.png";
import Courses from "../../assets/12.png";
import Fund from "../../assets/13.png";
import { AuthContext } from "../../context/auth/authContext";
import { StateContext } from "../../context/state";
import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import cookie from "react-cookies";
import { Link } from "react-router-dom";

const LeftBar = () => {
  const user = cookie.load("user");
  const location = useLocation().pathname;
  const [pageType, setPageType] = useState(location);

  const { currentUser } = useContext(AuthContext);
  const { myFriends } = useContext(StateContext);
  // console.log("------>",pageType)
  const [showFriends, setShowFriends] = useState(false);

  const toggleFriendsList = () => {
    setShowFriends(!showFriends);
  };

  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="user">
            <img src={user.profilePicture} alt="" />
            <Link
              to={`/profile/${user.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <span>{user.username}</span>
            </Link>
          </div>
          <div className="item" onClick={toggleFriendsList}>
            <img src={Friends} alt="" />
            <span>Friends</span>
          </div>
          {showFriends && (
            <div className="friends-list">
              {myFriends.map((friend) => (
                <div className="friend-item" key={friend.id}>
                  <img src={friend.profilePicture} alt="" />
                  <Link
                          to={`/profile/${friend.id}`}
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          <span>{friend.username}</span>
                        </Link>
                </div>
              ))}
            </div>
          )}

          <div className="item">
            <img src={Groups} alt="" />
            <span>Groups</span>
          </div>
          <div className="item">
            <img src={Market} alt="" />
            <span>Marketplace</span>
          </div>
          <div className="item">
            <img src={Watch} alt="" />
            <span>Watch</span>
          </div>
          <div className="item">
            <img src={Memories} alt="" />
            <span>Memories</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Your shortcuts</span>
          <div className="item">
            <img src={Events} alt="" />
            <span>Events</span>
          </div>
          <div className="item">
            <img src={Gaming} alt="" />
            <span>Gaming</span>
          </div>
          <div className="item">
            <img src={Gallery} alt="" />
            <span>Gallery</span>
          </div>
          <div className="item">
            <img src={Videos} alt="" />
            <span>Videos</span>
          </div>
          <div className="item">
            <img src={Messages} alt="" />
            <span>Messages</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Others</span>
          <div className="item">
            <img src={Fund} alt="" />
            <span>Fundraiser</span>
          </div>
          <div className="item">
            <img src={Tutorials} alt="" />
            <span>Tutorials</span>
          </div>
          <div className="item">
            <img src={Courses} alt="" />
            <span>Courses</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
