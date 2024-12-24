import React, { useState } from "react";
// import Sidebar from "../components/Sidebar";
// import Header from "../components/Header.js";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import axios from "axios";
export default function UploadVideo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [file, setFile] = useState(null);

  const refreshToken = localStorage.getItem("refreshToken");

  const Duration = useState(0);

  async function handleFileUpload(e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append("videoFile", file); // Append video file
    formData.append("thumbnail", thumbnail); // Append thumbnail file
    formData.append("title", title); // Append title
    formData.append("description", description); // Append description

    formData.append("duration", file.size);
    formData.append("views", 0);

    const accessToken = localStorage.getItem("accessToken");

    try {
      const response = await axios.post(
        "https://videosharing-platform-backend.onrender.com/video/api/UploadVideo",
        formData,
        {
          headers: {
            Authorization: `token ${accessToken}`,
          },
        }
      );

      if (response.status == 200) {
        alert("Video Uploaded Successfully");
        setTitle("");
        setDescription("");
        setThumbnail(null);
        setFile(null);
      }

      console.log(response);
    } catch (error) {
      console.log(error);
    }

    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }
  }
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
              <span>
                <Link to="/">Home</Link>
              </span>
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
                <span>Your channel</span>
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
                <span>Upload videos</span>
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
        <div className="channel-content">
          <h1 className="title">Channel content</h1>

          <div className="tabs">
            <div className="tab active">Videos</div>
            <div className="tab">Shorts</div>
            <div className="tab">Live</div>
            <div className="tab">Posts</div>
            <div className="tab">Playlists</div>
            <div className="tab">Podcasts</div>
            <div className="tab">Promotions</div>
          </div>

          <div className4="content-body">
            <div className="filter-section">
              <div className="filter">
                <i className="fas fa-filter"></i> Filter
              </div>
            </div>

            <div className="content-empty">
              {/* <img
                src="https://via.placeholder.com/200x200" // Placeholder image
                alt="No content available"
                className="empty-image"
              /> */}

{thumbnail && (
  <div>
    <h4>Thumbnail Preview:</h4>
    <img
      src={URL.createObjectURL(thumbnail)}
      alt="Thumbnail Preview"
      style={{ width: "200px", height: "auto", marginTop: "10px" }}
    />
  </div>
)}
              <form
                onSubmit={(e) => handleFileUpload(e)}
                className="upload-form"
              >
                <div>
                  <label htmlFor="thumbnail">Upload Thumbnail</label>
                  <input
                    type="file"
                    id="thumbnail"
                    accept="image/*"
                    onChange={(e) => setThumbnail(e.target.files[0])}
                  />
                </div>

                <div>
                  <label htmlFor="title">Title:</label>
                  <input
                    type="text"
                    id="title"
                    placeholder="Enter video title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="description">Description:</label>
                  <textarea
                    id="description"
                    placeholder="Enter video description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>

                <div>
                  <label htmlFor="File">File:</label>
                  <input
                    type="file"
                    id="File"
                    placeholder="select video"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </div>

                <button type="submit" className="upload-button">
                  Upload Video
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
