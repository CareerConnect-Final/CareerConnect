import React, { useState, useEffect } from "react";
import "./rightBar.scss";
import { AuthContext } from "../../context/auth/authContext";
import { StateContext } from "../../context/state";
import { JobContext } from "../../context/stateJob";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { RollerShades } from "@mui/icons-material";
import cookie from "react-cookies";
import axios from "axios";
const RightBar = () => {
  const userToken = cookie.load("user");
  const authToken = cookie.load("auth");
  const location = useLocation().pathname.slice(1);
  const [pageType, setPageType] = useState(location);
  
  const [send, setSend] = useState({});
  // console.log(pageType);
  const state = useContext(StateContext);
  const stateJob = useContext(JobContext);
  const headers = {
    Authorization: `Bearer ${authToken}`,
  };
  const handleSendFriendRequest = (userId) => {
    const obj = {
      sender_id: userToken.id,
      username: userToken.username,
      profilePicture: userToken.profilePicture,
      receiver_id: userId,
      message: `${userToken.username} sent you a friend request`,
    };
    console.log(userId);
    axios
      .post(
        `https://final-backend-nvf1.onrender.com/home/send-friend-request/${userId}`,
        obj,
        {
          headers,
        }
      )
      .then((data) => {
        console.log(data.data);
      })
      .catch((error) => {
        console.error("Error", error);
      });

    setSend((prevRequests) => ({
      ...prevRequests,
      [userId]: !prevRequests[userId],
    }));
  };
  
  const handleSendFollow=(userId)=>{
   const obj={}
    axios
    .post(
      `https://final-backend-nvf1.onrender.com/home/makefollow/${userId}`,obj,
     
      {
        headers,
      }
    )
    .then((data) => {
      console.log(data.data);
    })
    .catch((error) => {
      console.error("Error", error);
    });

  setSend((prevRequests) => ({
    ...prevRequests,
    [userId]: !prevRequests[userId],
  }));

  }
  const { friendRequests, acceptFriendRequest, declineFriendRequest } =
    useContext(StateContext);
  // console.log(pageType)

  return (
    <>
      {pageType === "job" && userToken.role === "company" && (
        <div className="rightBar">
          <div className="container">
          <div className="item">
              <span>People with same career</span>
              {stateJob.allUsers.map((user) => {
                if (
                  user.career === "web developer" &&
                  userToken.career === "web developer" &&
                  user.role=="user"
                ) {
                  return (
                    <div key={user.id} className="user">
                      <div className="userInfo">
                        <img
                          src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                          alt=""
                        />
                        <span>{user.username}</span>
                      </div>
                      {/* <div className="buttons2">
                        {send[user.id] ? (
                          <button
                            id="send"
                            onClick={() => handleSendFollow(user.id)}
                          >
                            Unfollow
                          </button>
                        ) : (
                          <button
                            id="pending"
                            onClick={() => handleSendFollow(user.id)}
                          >
                            Follow
                          </button>
                        )}
                      </div> */}
                    </div>
                  );
                }
              })}
            </div>
            <div className="item">
              <span>Followers</span>
              {stateJob.followers.map((user) => {
                //  if (
                //    user.role === "user" && userToken.id!==user.id&&
                //    !state.myFriends.find((friend) => friend.id === user.id)
                //  )
                {
                  return (
                    <div key={user.id} className="user">
                      <div className="userInfo">
                        <img
                          src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                          alt=""
                        />
                        <span>{user.username}</span>
                      </div>
                      {/* <div className="buttons2">
                        {send[user.id] ? (
                          <button
                            id="send"
                            onClick={() => handleSendFriendRequest(user.id)}
                          >
                            Pending
                          </button>
                        ) : (
                          <button
                            id="pending"
                            onClick={() => handleSendFriendRequest(user.id)}
                          >
                            Send Request
                          </button>
                        )}
                      </div> */}
                    </div>
                  );
                }
                // return null; // Exclude users who are already friends
              })}
            </div>
           
            {/* <div className="item">
              <span>Online Friends</span>
              <div className="user">
                <div className="userInfo">
                  <img
                    src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                    alt=""
                  />
                  <div className="online" />
                  <span>Jane Doe</span>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      )}
      {pageType === "job" && userToken.role === "user" && (
        <div className="rightBar">
          <div className="container">
          <div className="item">
           {/* {console.log(stateJob.youFollow.find((follower) => follower.company_name === "facebook1"))} */}
              <span>Related Companies</span>
              {stateJob.allUsers.map((user) => {
                if (
                  user.career === "web developer" &&
                  user.role=="company" &&
                  !stateJob.youFollow.find((follower) => follower.receiver_id === user.id)
                ) {
                  return (
                    <div key={user.id} className="user">
                      <div className="userInfo">
                        <img
                          src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                          alt=""
                        />
                        <span>{user.username}</span>
                      </div>
                      <div className="buttons2">
                        {send[user.id] ? (
                          <button
                            id="send"
                            onClick={() => handleSendFollow(user.id)}
                          >
                            Unfollow
                          </button>
                        ) : (
                          <button
                            id="pending"
                            onClick={() => handleSendFollow(user.id)}
                          >
                            Follow
                          </button>
                        )}
                      </div>
                    </div>
                  );
                }
              })}
            </div>
            {/* <div className="item">
              <span>Latest Activities</span>

              <div className="user">
                <div className="userInfo">
                  <img
                    src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                    alt=""
                  />
                  <p>
                    <span>Jane Doe</span> changed their cover picture
                  </p>
                </div>
                <span>1 min ago</span>
              </div>
            </div> */}


<div className="item">
           {/* {console.log(stateJob.youFollow.find((follower) => follower.company_name === "facebook1"))} */}
              <span>Compnies You Follow</span>
              {stateJob.allUsers.map((user) => {
                if (
                  // user.career === "web developer" &&
                  user.role=="company" &&
                  stateJob.youFollow.find((follower) => follower.receiver_id === user.id)
                ) {
                  return (
                    <div key={user.id} className="user">
                      <div className="userInfo">
                        <img
                          src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                          alt=""
                        />
                        <span>{user.username}</span>
                      </div>
                      {/* <div className="buttons2">
                        {send[user.id] ? (
                          <button
                            id="send"
                            onClick={() => handleSendFollow(user.id)}
                          >
                            Unfollow
                          </button>
                        ) : (
                          <button
                            id="pending"
                            onClick={() => handleSendFollow(user.id)}
                          >
                            Follow
                          </button>
                        )}
                      </div> */}
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
      )}

      {pageType === "" && userToken.role === "user" && (
        <div className="rightBar">
          <div className="container">
            <div className="item">
              <span>Friends requests</span>
              {friendRequests.map((request) =>
                request.status === "pending" &&
                userToken.id !== request.sender_id ? (
                  <div key={request.id} className="user">
                    <div className="userInfo">
                      <img src={request.profilePicture} alt="" />
                      <span>{request.username}</span>
                    </div>
                    <div className="buttons">
                      <button
                        onClick={() => acceptFriendRequest(request.sender_id)}
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => declineFriendRequest(request.sender_id)}
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                ) : null
              )}
            </div>
            <div className="item">
              <span>Suggested Friends</span>
              {state.allUsers.map((user) => {
                if (
                  user.role === "user" &&
                  userToken.id !== user.id &&
                  !state.myFriends.find((friend) => friend.id === user.id)
                ) {
                  return (
                    <div key={user.id} className="user">
                      <div className="userInfo">
                        <img
                          src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                          alt=""
                        />
                        <span>{user.username}</span>
                      </div>
                      <div className="buttons2">
                        {send[user.id] ? (
                          <button
                            id="send"
                            onClick={() => handleSendFriendRequest(user.id)}
                          >
                            Pending
                          </button>
                        ) : (
                          <button
                            id="pending"
                            onClick={() => handleSendFriendRequest(user.id)}
                          >
                            Send Request
                          </button>
                        )}
                      </div>
                    </div>
                  );
                }
                return null; // Exclude users who are already friends
              })}
            </div>

            {/* {send[user.id] ? "Pending" : "Add Friend"} */}
            {/* <div className="item">
              <span>Online Friends</span>

              <div className="user">
                <div className="userInfo">
                  <img
                    src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                    alt=""
                  />
                  <div className="online" />
                  <span>Jane Doe</span>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      )}
      {pageType === "" && userToken.role === "company" && (
        <div className="rightBar">
          <div className="container">
            <div className="item">
              <span>People with same career</span>
              {state.allUsers.map((user) => {
                if (
                  user.career === "web developer" &&
                  userToken.career === "web developer" &&
                  user.role=="user"
                ) {
                  return (
                    <div key={user.id} className="user">
                      <div className="userInfo">
                        <img
                          src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                          alt=""
                        />
                        <span>{user.username}</span>
                      </div>
                      {/* <div className="buttons2">
                        {send[user.id] ? (
                          <button
                            id="send"
                            onClick={() => handleSendFriendRequest(user.id)}
                          >
                            Unfollow
                          </button>
                        ) : (
                          <button
                            id="pending"
                            onClick={() => handleSendFriendRequest(user.id)}
                          >
                            Follow
                          </button>
                        )}
                      </div> */}
                    </div>
                  );
                }
              })}
            </div>
            {/* <div className="item">
             <span>Friends requests</span>
             {friendRequests.map((request) =>
               request.status === "pending" && userToken.id!==request.sender_id? (
                 <div key={request.id} className="user">
                   <div className="userInfo">
                     <img src={request.profilePicture} alt="" />
                     <span>{request.username}</span>
                   </div>
                   <div className="buttons">
                     <button
                       onClick={() => acceptFriendRequest(request.sender_id)}
                     >
                       Accept
                     </button>
                     <button
                       onClick={() => declineFriendRequest(request.sender_id)}
                     >
                       Decline
                     </button>
                   </div>
                 </div>
               ) : null
             )}
           </div> */}
            <div className="item">
              <span>Followers</span>
              {/* {console.log(state.followers)} */}
              {state.followers.map((user) => {
                //  if (
                //    user.role === "user" && userToken.id!==user.id&&
                //    !state.myFriends.find((friend) => friend.id === user.id)
                //  )
                {
                  return (
                    <div key={user.id} className="user">
                      <div className="userInfo">
                        <img
                          src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                          alt=""
                        />
                        <span>{user.username}</span>
                      </div>
                      {/* <div className="buttons2">
                        {send[user.id] ? (
                          <button
                            id="send"
                            onClick={() => handleSendFriendRequest(user.id)}
                          >
                            Pending
                          </button>
                        ) : (
                          <button
                            id="pending"
                            onClick={() => handleSendFriendRequest(user.id)}
                          >
                            Send Request
                          </button>
                        )}
                      </div> */}
                    </div>
                  );
                }
                return null; // Exclude users who are already friends
              })}
            </div>

            {/* {send[user.id] ? "Pending" : "Add Friend"} */}
           
          </div>
        </div>
      )}
    </>
  );
};

export default RightBar;

// {pageType === "job" && user.role === "user" &&

// }
