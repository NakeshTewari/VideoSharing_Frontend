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
  const [allVideos, setAllVideos] = useState([]);
  const [socket,setSocket]= useState(null);
  const [ownerName, setOwnerName] = useState("");
  const [subscriberCount, setSubscriberCount] = useState(0);
  
  
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

        setVideo(response.data.video);
        console.log(response.data.video);
        
        
        setOwnerName(response.data.ownerName);
        setSubscriberCount(response.data.subscriberCount);
        
        setAllVideos(allVideoResponse.data);

        console.log(allVideoResponse.data);
       
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();

    if(video){

      let history=JSON.parse(localStorage.getItem("watchHistory"))|| [];
   
      const exists= history.find((item)=> item.id === video._id);
  
      if(!exists){
        history.push({
          id:video._id,
          title:video.title,
          thumbnail:video.thumbnail,
          videoFile:video.videoFile,
          description:video.description,
          watchAt:new Date().toISOString(),
        })
  
        localStorage.setItem("watchHistory", JSON.stringify(history))
      }

    }
    
  
    
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
  console.log(video.videoFile);
  // console.log(allVideos);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="header">
        <div className="flex items-center space-x-4">
          <Link to="/"><FaYoutube className="text-red-600" style={{ fontSize: "4rem" }} /></Link>
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
        
          <div className="space-y-4">
            <div className="video-grid">
            {Array.isArray(allVideos) && allVideos.slice(0,5).map((video) => (
  <div key={video._id} className="video">
    {/* Video Items */}
    <div className="video-item">
      <Link to="/Watch">
        <video
          controls
          width="300"
          height="200"
          poster={video.thumbnail}
          preload="none"
          onClick={(e) => e.preventDefault()}
        >
          <source src={video.videoFile} type="video/mp4" />
        </video>
      </Link>
      <div className="video-details">
        <Link to={`/Watch/${video._id}`}>
        <h3>{video.title}</h3>
        <p>{video.description}</p>
        </Link>
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
              url={video?.videoFile} // The video file URL
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
          <VideoComments video={video} ownerName={ownerName} subscriberCount={subscriberCount} currentUser={currentUser} socket={socket}/>
           ) : null}

          
        </main>
      </div>
    </div>
  );
};

export default Watch;
