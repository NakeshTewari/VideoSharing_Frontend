import React from "react";
import { Link } from "react-router-dom";

import Youtube from "../images/Youtube.png";
import profile from "../images/profile.png";
import "../CSS/AppCSS.css";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

import { FaMicrophone } from "react-icons/fa6";

export default function Header() {
  return (
    <div className="header">
      <div className="left">
        <div>
          <button>
            <MenuIcon />
          </button>
        </div>

        <div className="logo">
          <img src={Youtube} alt="" className="Youtube" />
        </div>
      </div>

      <div className="middle">
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 600,
          }}
        >
          <IconButton sx={{ p: "10px" }} aria-label="menu">
            <MenuIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search for..."
            inputProps={{ "aria-label": "search google maps" }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        </Paper>
        <FaMicrophone size={40} />
      </div>

      <div className="right">
        <button class="circular-button">
          <img src={profile} alt="Circular Button" />
        </button>
        <h2>
          <Link to="/login">Login/SignUp</Link>
        </h2>
      </div>
    </div>
  );
}
