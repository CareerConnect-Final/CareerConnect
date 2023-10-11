import "./profile.scss";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { StateContext } from "../../context/state";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import Posts from "../../components/posts/Posts";
import { useContext, useEffect, useState } from "react";
import Post from "../../components/post/Post";
import axios from "axios";
import cookie from "react-cookies";
import { useParams } from "react-router-dom";
import ProfileModal from "./ProfileModal";

import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "../../firebase";
import { v4 } from "uuid";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Profile = () => {
  const [resumeUpload, setResumeUpload] = useState("");
  const [show, setShow] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [myCv, setMyCv] = useState("");
  const { userId } = useParams();
  const authToken = cookie.load("auth");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const state = useContext(StateContext);

  const cookieToken = cookie.load("auth");
  const cookieUser = cookie.load("user"); // this is not a good practice
  const token = cookieToken;
  const user = cookieUser;

  console.log("------->", user);

  // const location = useLocation().pathname;
  // const [pageType, setPageType] = useState(location);
  const [isFriend, setIsFriend] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [friendRequestPending, setFriendRequestPending] = useState(false);
  const [friendRequestStatus, setFriendRequestStatus] = useState(''); // Can be 'pending', 'accepted', 'rejected', or ''
  const [userFollowers, setUserFollowers] = useState([]);

  const [send, setSend] = useState({});
  const { friendRequests, acceptFriendRequest, declineFriendRequest } =
    useContext(StateContext);
    const userProfile = state.userProfile; 
//-------------------------------------------------------------------------
const isOwnProfile = user.id === parseInt(userId, 10);

useEffect(() => {
  const fetchUserFollowers = async () => {
    try {
      const response = await axios.get('https://final-backend-nvf1.onrender.com/careerjob/followdcompanies', {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      setUserFollowers(response.data);
    } catch (error) {
      console.error('Error fetching user followers:', error);
    }
  };

  fetchUserFollowers();
}, [authToken]);

const isCompanyFollowing = userFollowers.some(company => company.id === state.userProfile.id);

const handleFollowOrUnfollow = () => {
  const headers = {
    Authorization: `Bearer ${authToken}`,
  };

  const endpoint = isCompanyFollowing
    ? `https://final-backend-nvf1.onrender.com/careerjob/unfollow/${state.userProfile.id}`
    : `https://final-backend-nvf1.onrender.com/careerjob/follow/${state.userProfile.id}`;

  axios
    .post(endpoint, {}, { headers })
    .then((data) => {
      console.log(data.data);
      setUserFollowers((prevFollowers) => {
        return isCompanyFollowing
          ? prevFollowers.filter((company) => company.id !== state.userProfile.id)
          : [...prevFollowers, state.userProfile];
      });
      setIsCompanyFollowing(!isCompanyFollowing); // toggle the following status
    })
    .catch((error) => {
      console.error('Error', error);
    });
};

//------------------------------------------------

const handleFollowOrFriendRequest = () => {
  const headers = {
    Authorization: `Bearer ${authToken}`,
  };

  if (userProfile.role === 'company') {
    const endpoint = isFollowing
      ? `https://final-backend-nvf1.onrender.com/home/unfollow/${userId}`
      : `https://final-backend-nvf1.onrender.com/home/makefollow/${userId}`;
      console.log('Unfollow Endpoint:', endpoint);

      axios
      .post(endpoint, {}, { headers })
      .then((data) => {
        console.log('Unfollow Success:', data.data);
        console.log(data.data);
        setIsFollowing(!isFollowing);
        setFriendRequestStatus('');
      })
      .catch((error) => {
        console.error('Unfollow Error:', error);
      });
    
  } else {
    const obj = {
      sender_id: userProfile.id,
      username: userProfile.username,
      profilePicture: userProfile.profilePicture,
      receiver_id: userId,
      message: `${user.username} sent you a friend request`,
    };

    axios
      .post(`https://final-backend-nvf1.onrender.com/home/send-friend-request/${userId}`, obj, {
        headers,
      })
      .then((data) => {
        console.log(data.data);
        setFriendRequestStatus('pending');
      })
      .catch((error) => {
        console.error('Error', error);
      });

    setSend((prevRequests) => ({
      ...prevRequests,
      [userId]: !prevRequests[userId],
    }));
  }
};


  




//--------------------------------------------------- ADD FRIEND AND FRIENS---------------------------------------------------  
useEffect(() => {
  const fetchFriendsList = async () => {
    try {
      console.log('Before Fetch - friendRequestStatus:', friendRequestStatus);

      const response = await axios.get(
        'https://final-backend-nvf1.onrender.com/home/myfriends',
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      const friendsList = response.data;
      console.log('Friend Requests:', friendsList);
      const isUserFriend = friendsList.some((friend) => {
        return friend.id.toString() === userId;
      });
      setIsFriend(isUserFriend);

      const pendingRequest = friendRequests.find(
        (request) =>
          request.status === 'pending' &&
          ((request.sender_id === userId && user?.id !== userId) ||
           (request.receiver_id === userId && user?.id === userId))
      );

      console.log('Pending Request:', pendingRequest);
      setFriendRequestStatus(pendingRequest ? 'pending' : '');

      console.log('After Fetch - friendRequestStatus:', friendRequestStatus);

    } catch (error) {
      console.error('Error fetching friends list:', error);
    }
  };

  fetchFriendsList();
}, [userId, authToken, friendRequests, user?.id]);





  //----------------------------------------------------------------------------------------------

  const handleAdd = () => {
    if (resumeUpload !== "") {
      handleClose();

      if (authToken === null) {
        throw new Error("Authentication token not found.");
      } else if (authToken != null) {
        const headers = {
          Authorization: `Bearer ${authToken}`,
        };

        const resumeRef = ref(storage, `cvrrr/${resumeUpload.name + v4()}`);
        uploadBytes(resumeRef, resumeUpload).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            const obj = {
              user_id: user.id,
              full_name: user.username,
              cv_link: url,
            };
            console.log("ccdcdcdcsdcdscllllllllD", obj.cv_link);

            axios
              .post("https://final-backend-nvf1.onrender.com/home/cv", obj, {
                headers,
              })
              .then((data) => {
                console.log("ccdcdcdcsdcdscllllllllD", data.data);
              })
              .catch((error) => {
                console.error("Error creating post:", error);
              });
          });
        });
      }
    }
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleFileInputChange = (event) => {
    setResumeUpload(event.target.files[0]);
  };

  const handleShowCv = (e) => {
    console.log("====>>>>", userId);

    if (authToken === null) {
      throw new Error("Authentication token not found.");
    } else if (authToken != null) {
      const headers = {
        Authorization: `Bearer ${authToken}`,
      };

      axios
        .get(`https://final-backend-nvf1.onrender.com/home/cv/${userId}`, {
          headers,
        })
        .then((response) => {
          setMyCv(response.data);
          console.log("====>>>>", userId);
          console.log("cdcdcdcdcdc", response.data);
          console.log("cdcdcdcdcdc", myCv);

          if (response.data) {
            const newWindow = window.open(
              response.data,
              "_blank",
              "noopener,noreferrer"
            );
            if (newWindow) {
              newWindow.opener = null; // Prevent the new window from having access to the opener window.
            }
          }
        })
        .catch((error) => {
          setError(error);
        });
    }
  };

  const [isLoading, setIsLoading] = useState(true); // Initialize with true

  useEffect(() => {
    if (authToken != null) {
      const headers = {
        Authorization: `Bearer ${authToken}`,
      };

      axios
        .get(
          `https://final-backend-nvf1.onrender.com/home/userposts/${userId}`,
          {
            headers,
          }
        )
        .then((response) => {
          state.setUsersPosts(response.data);
          setIsLoading(false); // Set isLoading to false when data is fetched
        })
        .catch((error) => {
          state.setError(error);
          setIsLoading(false); // Handle errors and still set isLoading to false
        });
    }
  }, []);

  // useEffect(() => {
  //   // Fetch user-specific posts based on the userId
  //   if (authToken != null) {
  //     const headers = {
  //       Authorization: `Bearer ${authToken}`,
  //     };

  //     axios
  //       .get(`https://final-backend-nvf1.onrender.com/home/userposts/${userId}`, {
  //         headers,
  //       })
  //       .then((response) => {
  //         console.log("")
  //         state.setUserPosts(response.data);
  //       })
  //       .catch((error) => {
  //         state.setError(error);
  //       });
  //   }

  // }, [userId]);

  useEffect(() => {
    if (authToken != null) {
      const headers = {
        Authorization: `Bearer ${authToken}`,
      };

      axios
        .get(`https://final-backend-nvf1.onrender.com/home/users/${userId}`, {
          headers,
        })
        .then((response) => {
          state.setUserProfile(response.data);
        })
        .catch((error) => {
          state.setError(error);
        });
    }
  }, []);

  // if (authToken != null) {
  //   const headers = {
  //     Authorization: `Bearer ${authToken}`,
  //   };

  //   axios
  //     .get(`https://final-backend-nvf1.onrender.com/home/users/${userId}`, {
  //       headers,
  //     })
  //     .then((response) => {
  //       state.setUsers(response.data);
  //     })
  //     .catch((error) => {
  //       state.setError(error);
  //     });
  // }
  // console.log(state.userProfile)
  //  const oneUser=state.allUsers.find((user)=>{user.id==userId})
  //  const oneUser = state.allUsers.find((user) => user.id === userId)
  //  console.log(oneUser)
  return (
    <div className="profile">
      <div className="images">
        <img
          src="https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
          className="cover"
        />
        <img
          src={state.userProfile.profilePicture || null}
          alt=""
          className="profilePic"
        />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="top">
            {user?.id == state.userProfile.id ? (
              <MoreVertIcon onClick={openModal} />
            ) : null}
          </div>
          <div className="sub-top">

          </div>
          <div className="user-career">
            <div>
              <span>
                {state.userProfile.firstName} {state.userProfile.lastName}
              </span>
            </div>
            <div>{state.userProfile.career}</div>
          </div>
          {!isOwnProfile && (
    <button onClick={handleFollowOrFriendRequest}>
      {isFriend
        ? 'Friends'
        : userProfile.role === 'company'
        ? isFollowing
          ? 'Unfollow'
          : 'Follow'
        : friendRequestStatus === 'pending'
        ? 'Pending'
        : 'Add Friend'}
    </button>
  )}
  {user?.id !== state.userProfile.id && user?.role === 'company' && (
    <button onClick={handleFollowOrUnfollow}>
      {isCompanyFollowing ? 'Unfollow' : 'Follow'}
    </button>
  )}
          <div className="bio">
            <div>{state.userProfile.city}</div>
          </div>
          <div className="contact-info">
            <div className="con-info">Contact Info:</div>
            <div className="contact-icons">
              <div>
                <AlternateEmailOutlinedIcon /> {state.userProfile.email}
              </div>
              <div>
                <PermContactCalendarIcon />
                {state.userProfile.phoneNumber}
              </div>
            </div>
          </div>
        </div>
        <div className="uInfo-bio">
          <div>
            <div>About : </div>
            <div>
              {user?.id != userId && user?.role === "company" ? (
                <button className="resume" onClick={handleShowCv}>
                  Resume
                </button>
              ) : null}

              {user?.id == userId && user?.role !== "company" ? (
                <button className="resume" onClick={handleShowCv}>
                  Resume
                </button>
              ) : null}
            </div>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>upload Resume</Form.Label>
                    <Form.Control
                      type="file"
                      placeholder="choose your Resume"
                      autoFocus
                      onChange={handleFileInputChange}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleAdd}>
                  Share
                </Button>
              </Modal.Footer>
            </Modal>{" "}
          </div>
          <div>{state.userProfile.bio}</div>
        </div>
        {isModalOpen && (
          <ProfileModal isOpen={isModalOpen} closeModal={closeModal} />
        )}
        {state.usersPosts.map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </div>
    </div>
  );
};

export default Profile;

// useEffect(() => {
//   if (authToken === null) {
//     throw new Error("Authentication token not found.");
//   } else if (authToken != null) {
//     const headers = {
//       Authorization: `Bearer ${authToken}`,
//     };
//     axios
//       .get(
//         `https://final-backend-nvf1.onrender.com/home/userposts/${userId}`,
//         { headers }
//       )
//       .then((response) => {
//         state.setUserPosts(response.data);
//       })
//       .catch((error) => {
//         state.setError(error);
//       });
//   }
// }, [userId, authToken]);

// state.userProfile.profilePicture
