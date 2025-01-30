import React, { useState } from "react";
// import Sidebar from "../components/Sidebar";
// import Header from "../components/Header.js";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
export default function UploadVideo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [file, setFile] = useState(null);
  const [loadingState,setLoadingState]=useState(false);
  const [allSubscribedChannels, setAllSubscribedChannels] = useState(null);

  const refreshToken = localStorage.getItem("refreshToken");
  const username = localStorage.getItem("username");

  const Duration = useState(0);

 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

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
  

  async function handleFileUpload(e) {
    setLoadingState(true);

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
        "http://localhost:4000/video/api/UploadVideo",
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
        setLoadingState(false);
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
                          <Link to="/Your_channel">Your Channel</Link>
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
        <div className="channel-content">
          

          

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
                onSubmit={handleFileUpload}
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
              <div >{loadingState? <h3>Uploading video!</h3>: <h2></h2>}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
