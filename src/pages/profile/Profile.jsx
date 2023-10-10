import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import Posts from "../../components/posts/Posts";
import { useContext, useEffect, useState } from "react";
import Post from "../../components/post/Post";
const userAPI = "https://final-backend-nvf1.onrender.com/profile";
import { StateContext } from "../../context/state";
import axios from "axios";

import { useLocation, useNavigate } from "react-router-dom";
import cookie from "react-cookies";

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
import { useParams } from "react-router-dom";

const Profile = () => {
  const [resumeUpload, setResumeUpload] = useState(""); ///
  const [show, setShow] = useState(false);
  const [myCv, setMyCv] = useState("");
  const { userId } = useParams();
  console.log("====>>>>", userId);

  const authToken = cookie.load("auth");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const state = useContext(StateContext);

  const cookieToken = cookie.load("auth");
  const cookieUser = cookie.load("user"); // this is not a good practice
  const token = cookieToken;
  const user = cookieUser;

  const location = useLocation().pathname;
  const [pageType, setPageType] = useState(location);
  // console.log(pageType)

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
                // setResumeUpload("");
                // state.addResume(data.data);
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

  return (
    <div className="profile">
      <div className="images">
        <img
          src="https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
          className="cover"
        />
        <img src={user.profilePicture || null} alt="" className="profilePic" />
      </div>
      <div className="profileContainer">
        {/* <div className="uInfo">
          <div className="top-right">
            <MoreVertIcon />
          </div>
          <div className="left">
            <a href="http://facebook.com">
            </a>
          </div>
          <div className="center">
            <span>
              {user.firstName} {user.lastName}
            </span>

                <div>{user.bio}</div>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>{user.city}</span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span>{user.career}</span>
              </div>
            </div>
            <button>follow</button>
          </div>
          <div className="right">
            <EmailOutlinedIcon />
          </div>

        </div> */}

        <div className="uInfo">
          <div className="top">
            <button>follow</button>
            <MoreVertIcon />
          </div>
          <div className="user-career">
            <div>
              <span>
                {user.firstName} {user.lastName}
              </span>
            </div>
            <div>{user.career}</div>
          </div>

          <div className="bio">
            <div>{user.city}</div>
          </div>
          <div className="contact-info">
            <div className="con-info">Contact Info:</div>
            <div className="contact-icons">
              <div>
                <AlternateEmailOutlinedIcon /> {user.email}
              </div>
              <div>
                <PermContactCalendarIcon />
                {user.phoneNumber}
              </div>
            </div>
          </div>

          {/* <div className="right">
            <EmailOutlinedIcon />
          </div> */}
        </div>
        <div className="uInfo-bio">
          <div>
            <div>About :</div>
            <div>
              <button className="resume" onClick={handleShowCv}>
                Resume
              </button>
            </div>
            <Button variant="primary" className="resume1" onClick={handleShow}>
              Add Resume
            </Button>
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
          <div>{user.bio}</div>
        </div>
        {state.userPosts.map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </div>
    </div>
  );
};

export default Profile;
