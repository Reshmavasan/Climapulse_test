import React from "react";
import { useNavigate } from "react-router-dom";
import '../css/Navbar.css';

import homeIcon from "../images/Home.svg";
import archiveIcon from "../images/Archive.svg";
import messageIcon from "../images/Messages.svg";
import LogoIcon from "../images/Logo.svg";
import userAvatar from "../images/User.png";

function Navbar({ activeTab, setActiveTab }) {
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === "home") {
      navigate("/users");
    } else if (tab === "archive" || tab === "messages") {
      alert("Page not available");
      setActiveTab("home");
    }
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <div className="logo-box"><img src={LogoIcon} alt="logo" /></div>
        <span className="logo-text">Climatest</span>
      </div>

      <div className="nav-links">
        <div
          className={`nav-link home-link ${activeTab === "home" ? "active" : ""}`}
          onClick={() => handleTabClick("home")}
        >
          <div className="icon-box"><img src={homeIcon} alt="home" /></div>
          <span className="link-text home-text">Home</span>
          {activeTab === "home" && <div className="active-bar"></div>}
        </div>

        <div
          className={`nav-link archive-link ${activeTab === "archive" ? "active" : ""}`}
          onClick={() => handleTabClick("archive")}
        >
          <div className="icon-box"><img src={archiveIcon} alt="archive" /></div>
          <span className="link-text archive-text">Archive</span>
          {activeTab === "archive" && <div className="active-bar"></div>}
        </div>

        <div
          className={`nav-link messages-link ${activeTab === "messages" ? "active" : ""}`}
          onClick={() => handleTabClick("messages")}
        >
          <div className="icon-box"><img src={messageIcon} alt="messages" /></div>
          <span className="link-text messages-text">Messages</span>
          {activeTab === "messages" && <div className="active-bar"></div>}
        </div>
      </div>

      <div className="user-info">
        <div className="user-text">
          <div className="user-name">XXX</div>
          <div className="user-role">Status</div>
        </div>
        <div className="user-avatar"><img src={userAvatar} alt="useravatar" /></div>
      </div>
    </nav>
  );
}

export default Navbar;
