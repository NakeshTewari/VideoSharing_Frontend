import React, { useEffect, useState } from "react";

import { FaYoutube, FaSearch, FaBell } from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";

import VideoComments from "../components/VideoComments";


const Watch = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allVideos, setAllVideos] = useState(null);
  const [socket,setSocket]= useState(null);
  
  const [currentUser, setCurrentUser] = useState();

  const accessToken = localStorage.getItem("accessToken");
  
  const username=localStorage.getItem("username");


  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/video/api/getVideo/${id}`
        );

        const allVideoResponse = await axios.get(
          "http://localhost:4000/video/api/getAllVideos",
          {
            headers: {
              Authorization: `token ${accessToken}`,
            },
          }
        );

        const currentUserResponse = await axios.get(
          "http://localhost:4000/userauth/api/currentUser",
          {
            headers: {
              Authorization: `token ${accessToken}`,
            },
          }
        );

        setCurrentUser(currentUserResponse.data);

        setVideo(response.data);
        setAllVideos(allVideoResponse.data);

        console.log(response.data, currentUserResponse.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
    
  }, [id]);


  useEffect(()=>{
   
    const socketIo = io("http://localhost:4000", {
      transports: ["websocket", "polling"], // Ensure fallback options
      withCredentials: true, // Allow cross-origin credentials
    });
    setSocket(socketIo);
   
    if (socket && video && currentUser) {
      socket.emit('join-video', { videoId: video._id, userId: currentUser._id });

      // console.log(video?._id, " ", currentUser?._id, "socket", socketIo);
    }

    

   
  },[video, currentUser])

  //handling comments

  

  

  if (loading) return <div>Loading......</div>;
  // console.log(video);
  // console.log(allVideos);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="header">
        <div className="flex items-center space-x-4">
          <FaYoutube className="text-red-600" style={{ fontSize: "2rem" }} />
          <input className="" placeholder="Search" type="text" />
          <button>
            <FaSearch />
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <FaBell className="text-xl" />
          <div className="user-avatar rounded-full">N</div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="video-sidebar space-y-4">
          <div className="space-y-2">
            <h2 className="text-lg">From your search</h2>
            <h2 className="text-lg">From the series</h2>
            <h2 className="text-lg">From the web</h2>
          </div>
          <div className="space-y-4">
            <div className="video-grid">
              {allVideos &&
                allVideos.map((video) => (
                  <div key={video._id} className="video">
                    {/* Video Items */}
                    <div className="video-item">
                      <Link to={`/Watch/${video._id}`}>
                        <video
                          controls
                          width="300"
                          height="200"
                          poster={video.thumbnail}
                          preload="none"
                          onClick={(e) => e.preventDefault()}
                        >
                          {/* <img
                        alt="Video thumbnail"
                        height="200"
                        src={video.thumbnail}
                        width="300"
                      /> */}
                          <source src={video.videoFile} type="video/mp4" />
                        </video>
                      </Link>
                      <div className="video-details">
                        <h3>{video.title}</h3>
                        <p>{video.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </aside>

        {/* Video Section */}
        <main className="flex-1 p-4">
          <div className="video-section">
            <ReactPlayer
              url={video.videoFile} // The video file URL
              controls={true} // Show video controls
              playing={true} // Autoplay the video
              width="90%" // Set the width to 100% (responsive)
              height="8%" // Set the height to 100%
              volume={0.8} // Set initial volume (0 to 1)
              muted={false} // Start with sound
              onError={(e) => console.log("Error playing video", e)} // Handle errors
            />
          </div>

          {/* Comments Section */}
          
          {/* Comments Section */}
         {video && currentUser && socket ? (
          <VideoComments video={video} currentUser={currentUser} socket={socket}/>
           ) : null}

          
        </main>
      </div>
    </div>
  );
};

export default Watch;
