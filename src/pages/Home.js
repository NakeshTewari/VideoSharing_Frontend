import React, { useEffect } from "react";
// import Sidebar from "../components/Sidebar";
// import Header from "../components/Header.js";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [allVideos, setAllVideos] = useState(null);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get(
          "https://videosharing-platform-backend.onrender.com/video/api/getAllVideos",
          {
            headers: {
              Authorization: `token ${accessToken}`,
            },
          }
        );

        setAllVideos(response.data);
        console.log(JSON.stringify(response.data));
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const username = localStorage.getItem("username");

  return (
    <div className="Home">
      <div className="flex">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="flex items-center mb-6">
            <i className="fab fa-youtube text-red-600 text-3xl"></i>
            <span className="logo-text">YouTube</span>
          </div>
          <div className="space-y-4">
            <div className="menu-item">
              <i className="fas fa-home"></i>
              <span>Home</span>
            </div>
            <div className="menu-item">
              <i className="fas fa-video"></i>
              <span>Shorts</span>
            </div>
            <div className="menu-item">
              <i className="fas fa-folder"></i>
              <span>Subscriptions</span>
            </div>
          </div>
          <div className="section mt-8">
            <h2 className="section-title">You</h2>
            <div className="space-y-4">
              <div className="menu-item">
                <i className="fas fa-user"></i>
                <span>
                  <Link to="/Your_channel">Your Channel</Link>
                </span>
              </div>
              <div className="menu-item">
                <i className="fas fa-history"></i>
                <span>History</span>
              </div>
              <div className="menu-item">
                <i className="fas fa-list"></i>
                <span>Playlists</span>
              </div>
              <div className="menu-item">
                <i className="fas fa-video"></i>
                <span>
                  <Link to="/Uploadvideo">Upload videos</Link>
                </span>
              </div>
              <div className="menu-item">
                <i className="fas fa-clock"></i>
                <span>Watch later</span>
              </div>
              <div className="menu-item">
                <i className="fas fa-thumbs-up"></i>
                <span>Liked videos</span>
              </div>
            </div>
          </div>
          <div className="section mt-8">
            <h2 className="section-title">Subscriptions</h2>
            <div className="space-y-4">
              <div className="menu-item">
                <i className="fas fa-user-circle"></i>
                <span>GateWay Classes</span>
              </div>
              <div className="menu-item">
                <i className="fas fa-user-circle"></i>
                <span>Aditya Verma</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <div className="top-bar">
            <input className="search-bar" placeholder="Search" type="text" />
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

          <div className="categories">
            <button className="category-btn">All</button>
            <button className="category-btn">Music</button>
            <button className="category-btn">Movie musicals</button>
            <button className="category-btn">Mixes</button>
            <button className="category-btn">Gaming</button>
            <button className="category-btn">JavaScript</button>
            <button className="category-btn">C++</button>
            <button className="category-btn">Indian pop music</button>
            <button className="category-btn">Algorithms</button>
            <button className="category-btn">Reaction videos</button>
            <button className="category-btn">Restaurants</button>
          </div>

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

          {/* Add more video items here */}
        </div>
      </div>
    </div>
  );
}
