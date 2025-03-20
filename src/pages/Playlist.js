import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";

export default function Playlist() {
  const [allVideos, setAllVideos] = useState(null);
  const [searchVideo, setSearchVideo] = useState(null);
  const [allSubscribedChannels, setAllSubscribedChannels] = useState([]);
  const [isCreated,setIsCreated]= useState(false);
  const [allPlaylistVideo,setAllPlaylistVideo]=useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        // Fetch subscribed channels
        const playlistVideos = await axios.get(
          "http://localhost:4000/playlist/api/fetchPlaylist",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log(playlistVideos.status);
        
        if(playlistVideos.status===200)
        setAllPlaylistVideo(playlistVideos.data);

        console.log(playlistVideos.data);
        
        if(playlistVideos) setIsCreated(true);


        const subscribedResponse = await axios.get(
          "http://localhost:4000/subscription/api/allSubscribedChannels",
          {
            headers: {
              Authorization: `token ${accessToken}`,
            },
          }
        );
        setAllSubscribedChannels(subscribedResponse.data);

        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const username = localStorage.getItem("username");

  const handleSearch = (e) => {
    const value = e.target.value;

    if (allVideos) {
      const query = allVideos.filter((video) =>
        video.title.toLowerCase().includes(value.toLowerCase())
      );
      setSearchVideo(query);
    } 
  };


  const [formData, setFormData] = useState({
    playlistName: "",
    description: "",
  });

  const [avatar, setAvatar] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
  
    const { playlistName, description } = formData;
    if (!playlistName || !description) {
      setError("All fields are required.");
      return;
    }
  
    if (!avatar) {
      setError("Please upload an avatar.");
      return;
    }
  
    try {
      // FormData object for sending data and file
      const data = new FormData();
      data.append("playlistName", playlistName);
      data.append("description", description);
      data.append("avatar", avatar); // Ensure avatar is appended
  
      const accessToken = localStorage.getItem("accessToken");
  
      // Send data to the backend
      const response = await axios.post(
        "http://localhost:4000/playlist/api/createPlaylist",
        data,
        {
          headers: {
            Authorization: `token ${accessToken}`,
          },
        }
      );
      console.log(response.status);
      
  
      if (response.status === 200) {
        setSuccess("Creation successful! Redirecting to playlist...");
          setIsCreated(true);
      } else {
        setError("An error occurred. Please try again.");
      }
    } catch (err) {
      setError(err.response?.data?.msg || "An error occurred. Please try again.");
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
             {Array.isArray(allSubscribedChannels) &&
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
          {isCreated ? (
                allPlaylistVideo &&
                allPlaylistVideo.map((video) => (
  
                  <div key={video._id} className="video">
                    <div className="video-item">
                      <Link to={`/Watch/${video._id}`}>
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
                ))
) : (
  <div className="signup-page">
      <div className="signup-container">
        <div className="signup-form-section">
          <h1 className="signup-title">Hello!</h1>
          <p className="signup-subtitle">Please Create Playlist to continue</p>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="input-group">
              <input
                type="text"
                name="playlistName"
                placeholder="Playlist Name"
                className="input-field"
                value={formData.playlistName}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                name="description"
                placeholder="Description"
                className="input-field"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label className="file-upload-label">Upload Avatar</label>
              <input
                type="file"
                name="avatar"
                accept="image/*"
                className="file-upload-input"
                onChange={(e) => setAvatar(e.target.files[0])} 
              />
            </div>
            <button type="submit" className="signup-button">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
)}
</div>

 
         

          {/* <div className="video-grid">
            { searchVideo? searchVideo.map((video)=>(

               <div key={video._id} className="video">
               <div className="video-item">
                 <Link to={`/Watch/${video._id}`}>
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

            )):allVideos &&
              allVideos.map((video) => (

                <div key={video._id} className="video">
                  <div className="video-item">
                    <Link to={`/Watch/${video._id}`}>
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
          </div> */}

          {/* Add more video items here */}
        </div>
      </div>
    </div>
  );
}

