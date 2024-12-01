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


function App() {
  

  
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/Signup" element={<Signup />}></Route>
        <Route path="/Uploadvideo" element={<UploadVideo />}></Route>
        <Route path="/Watch/:id" element={<Watch />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
