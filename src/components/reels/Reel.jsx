// // src/components/ReelsPage.js

// import React, { useEffect, useState, useContext, useRef } from "react";
// import "./ReelsPage.scss";
// import { StateContext } from "../../context/state";

// const Reel = (props) => {
//   return (
//     <>
//       <video controls autoPlay muted>
//         <source src={props.reel.video} type="video/mp4" />
//         Your browser does not support the video tag.
//       </video>
//     </>
//   );
// };

// export default Reel;


import React, { useRef, useState, useEffect } from "react";

import "./reel.scss";

export default function Reel(props) {
  const [isVideoPlaying, setisVideoPlaying] = useState(false);

  const vidRef = useRef();

  const onVideoClick = () => {
    if (isVideoPlaying) {
      vidRef.current.pause();
      setisVideoPlaying(false);
    } else {
      vidRef.current.play();
      setisVideoPlaying(true);
    }
  };


  useEffect(() => {}, []);

  useEffect(() => {
    const scroll = document.getElementById("video-container");

    if (scroll) {
      scroll.addEventListener("scroll", () => {
        vidRef.current.pause();
      });
    }
  }, []);

  return (
    <div className='video-cards'>
      <video
        loop
        onClick={onVideoClick}
        className='video-player'
        ref={vidRef}
        src={props.url}
      />

    </div>
  );
}

