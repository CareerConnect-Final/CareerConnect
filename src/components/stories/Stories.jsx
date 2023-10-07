// import axios from "axios";
// import { useContext } from "react";
// import "./stories.scss";
// import { AuthContext } from "../../context/auth/authContext";
// import { StateContext } from "../../context/state";
// import { useState } from "react";
// import cookie from "react-cookies";

// import {
//   ref,
//   uploadBytes,
//   getDownloadURL,
//   listAll,
//   list,
// } from "firebase/storage";
// import { storage } from "../../firebase";
// import { v4 } from "uuid";

// const ShareReels = () => {
//   const { currentUser } = useContext(AuthContext);
//   const [videoUpload, setVideoUpload] = useState("");///
//   const [videoContent, setVideoContent] = useState("");///
//   const [playing, setPlaying] = useState(false);///

//   const newReel = useContext(StateContext);
//  const user=cookie.load("user")
//  const handleAdd = () => {
//   const videoRef = ref(storage, `${user.email}/reels/${videoUpload.name + v4()}`);
//   uploadBytes(videoRef, videoUpload).then((snapshot) => {
//     getDownloadURL(snapshot.ref).then( (url) => {

//       const obj = {
//         user_id: user.id,
//         username: user.firstName,
//         video: url, 
//         profilePicture: user.profilePicture,
//       };

//       console.log(url)
  
//       axios
//         .post("https://final-backend-nvf1.onrender.com/api/v1/reels", obj)
//         .then((data) => {
//           setVideoUpload("")
//           newReel.addReel(data.data);
//           console.log("data.daat==>",data.data)
//         })
//         .catch((error) => {
//           console.error("Error creating reel:", error);
//         });
//     });
//   });
  
// };

// const handlePlayClick = () => {
//   setPlaying(true);
// };

// const handlePauseClick = () => {
//   setPlaying(false);
// };

//   //TEMPORARY
//   const stories = [
//     {
//       id: 1,
//       name: "John Doe",
//       img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
//     },
//     {
//       id: 2,
//       name: "John Doe",
//       img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
//     },
//     {
//       id: 3,
//       name: "John Doe",
//       img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
//     },
//     {
//       id: 4,
//       name: "John Doe",
//       img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
//     },
//   ];

//   return (
//     <div className="stories">
//       <div className="story">
//           <img src={user.profilePicture} alt="" />
//           <span>{currentUser.name}</span>
//           <button>+</button>
//         </div>
//       {stories.map(story=>(
//         <div className="story" key={story.id}>
//           <img src={story.img} alt="" />
//           <span>{story.name}</span>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ShareReels;


import axios from "axios";
import { useContext } from "react";
import "./stories.scss";
import { AuthContext } from "../../context/auth/authContext";
import { StateContext } from "../../context/state";
import { useState } from "react";
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

const ShareReels = () => {
  const { currentUser } = useContext(AuthContext);
  const [videoUpload, setVideoUpload] = useState("");///

  const newReel = useContext(StateContext);
 const user=cookie.load("user")
 const handleAdd = () => {
  const videoRef = ref(storage, `${user.email}/reels/${videoUpload.name + v4()}`);
  uploadBytes(videoRef, videoUpload).then((snapshot) => {
    getDownloadURL(snapshot.ref).then( (url) => {

      const obj = {
        user_id: user.id,
        username: user.firstName,
        video: url, 
        profilePicture: user.profilePicture,
      };

      console.log("url==>",url)

      axios
        .post("https://final-backend-nvf1.onrender.com/api/v1/reels", obj)
        .then((data) => {
          setVideoUpload("")
          newReel.addReel(data.data);
          console.log("data.daat==>",data.data)

        })
        .catch((error) => {
          console.error("Error creating reel:", error);
        });


    });
  });
  
};


  //TEMPORARY
  const stories = [
    {
      id: 1,
      name: "John Doe",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      id: 2,
      name: "John Doe",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      id: 3,
      name: "John Doe",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      id: 4,
      name: "John Doe",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
  ];

  return (
    <div className="stories">
      <div className="story">
        {/* <img src={user.profilePicture} alt="" /> */}
        {/* <span>{}</span> */}
        <input type="file" id="file" style={{ display: "none" }}
            onChange={(event) => { //////////////////////
              setVideoUpload(event.target.files[0]);
          }} />
        <label htmlFor="file">
              <div className="item">
                <img src={user.profilePicture} alt="" />
                <span>Add Story</span>
              </div>
            </label>
            {
              videoUpload !== "" ? <button onClick={handleAdd}>+</button> : ""

            }
      </div>

      {stories.map(story=>(
        <div className="story" key={story.id}>
          <img src={story.img} alt="" />
          <span>{story.name}</span>
        </div>
      ))}
    </div>
  );
};

export default ShareReels;
