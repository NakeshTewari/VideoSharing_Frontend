import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

export default function History() {
  const [allHistoryVideos, setallHistoryVideos] = useState(null);
  const [searchVideo, setSearchVideo] = useState(null);
  const [allSubscribedChannels, setAllSubscribedChannels] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const history= JSON.parse(localStorage.getItem("watchHistory"));
        console.log("History...",history);
        
        
        setallHistoryVideos(history);

        // Fetch subscribed channels
        const subscribedResponse = await axios.get(
          "http://localhost:4000/subscription/api/allSubscribedChannels",
          {
            headers: {
              Authorization: `token ${accessToken}`,
            },
          }
        );
        setAllSubscribedChannels(subscribedResponse.data);
        // console.log(subscribedResponse.data);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const username = localStorage.getItem("username");

  const handleSearch = (e) => {
    const value = e.target.value;

    if (allHistoryVideos) {
      const query = allHistoryVideos.filter((video) =>
        video.title.toLowerCase().includes(value.toLowerCase())
      );
      setSearchVideo(query);
    }
  };

  return (
    <div className="Home">
      <div className="flex">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="flex items-center mb-6">
            <i className="fab fa-youtube text-red-600 text-3xl"></i>
            <h1>YouTube</h1>
          </div>
          <div className="space-y-4">
            <div className="menu-item">
              <i className="fas fa-home"></i>
              <span>
                <Link to="/">Home</Link>
              </span>
            </div>
            <div className="menu-item">
              <i className="fas fa-folder"></i>
              <span>
                <Link to="/Subscriptions">Subscriptions</Link>
              </span>
            </div>
          </div>
          <div className="section mt-8">
            <h2 className="section-title">{username}</h2>
            <div className="space-y-4">
              <div className="menu-item">
                <i className="fas fa-user"></i>
                <span>
                  Your Channel
                </span>
              </div>
              <div className="menu-item">
                <i className="fas fa-history"></i>
                <span>
                  <Link to="/history">History</Link>
                </span>
              </div>
              <div className="menu-item">
                <i className="fas fa-list"></i>
                <span>
                  <Link to="/playlists">Playlists</Link>
                </span>
              </div>
              <div className="menu-item">
                <i className="fas fa-video"></i>
                <span>
                  <Link to="/Uploadvideo">Upload videos</Link>
                </span>
              </div>
             
              <div className="menu-item">
                <i className="fas fa-thumbs-up"></i>
                <span>Liked videos</span>
              </div>
            </div>
          </div>
          <div className="section mt-8">
            <h2 className="section-title">Subscribed Channels</h2>
            <br />
            <div>
            <ol>
             {allSubscribedChannels &&
                 allSubscribedChannels.map((channel) => (
                <li key={channel._id} className="subscription-item">
                <h3>{channel.subscribed_to_id.username}</h3>
             </li>
            ))}
          </ol>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <div className="top-bar">
            <input className="search-bar" placeholder="Search videos..." type="text" onInput={handleSearch}/>
            <i className="fas fa-search text-xl"></i>

            {/* Login/Signup and Profile section */}
            <div className="auth-section">
              <button className="auth-btn login">
                <Link to="/login">Login</Link>
              </button>
              <button className="auth-btn signup">
                <Link to="/Signup">SignUp</Link>
              </button>
              <i className="fas fa-user-circle profile-icon text-xl"></i>
            </div>

            <Stack direction="row" spacing={2}>
              <h2>{username}</h2>
            </Stack>
          </div>


          <div className="video-grid">
            { searchVideo? searchVideo.map((video)=>(

               <div key={video._id} className="video">
               <div className="video-item">
                 <Link to={`/Watch/${video.id}`}>
                   <video
                     controls
                     width="300"
                     height="200"
                     poster={video.thumbnail}
                   >
                     <source src={video.videoFile} type="video/mp4" />
                   </video>
                 </Link>
                 <div className="video-details">
                   <h3>{video.title}</h3>
                   <p>{video.description}</p>
                 </div>
               </div>
             </div>

            )):allHistoryVideos &&
              allHistoryVideos.map((video) => (

                <div key={video._id} className="video">
                  <div className="video-item">
                    <Link to={`/Watch/${video.id}`}>
                      <video
                        controls
                        width="300"
                        height="200"
                        poster={video.thumbnail}
                      >
                       
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

          {/* Add more video items here */}
        </div>
      </div>
    </div>
  );
}
