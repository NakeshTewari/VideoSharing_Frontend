import React from "react";

// import "./pages/Home";
// import "./pages/Login";

import "./CSS/AppCSS.css";
import "./CSS/LoginCSS.css";
import "./CSS/Signup.css";
import "./CSS/uploadVideo.css";
import "./CSS/Watch.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UploadVideo from "./pages/UploadVideo";
import Watch from "./pages/Watch";
import Your_channel from "./pages/Your_channel";
import Subscription from "./pages/Subscriptions";
import Playlist from "./pages/Playlist";
import History from "./pages/History";

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/Signup" element={<Signup />}></Route>
        <Route path="/Uploadvideo" element={<UploadVideo />}></Route>
        <Route path="/Watch/:id" element={<Watch />}></Route>
        <Route path="/Your_channel" element={<Your_channel/>}></Route>
        <Route path="/Subscriptions" element={<Subscription/>}></Route>
        <Route path="/Playlists" element={<Playlist/>}></Route>
        <Route path="/History" element={<History/>}></Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
