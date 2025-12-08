import React, { useState } from "react";
import Navbar from "./Navbar";

function Layout({ children }) {
  const [activeTab, setActiveTab] = useState("home");

  const pageContainerStyle = {
    minHeight: "100vh",
    width: "100%",
    margin: 0,
    padding: 0,
    background: "#161616",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const mainContainerStyle = {
    width: "100%",
    maxWidth: "1230px",
    display: "flex",
    flexDirection: "column",
    gap: "64px",
    marginTop: "50px",
    padding: "0 16px 96px",
    boxSizing: "border-box",
  };

  const contentContainerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    width: "100%",
  };

  return (
    <div style={pageContainerStyle}>
      {/* Top navigation bar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div style={mainContainerStyle}>
        <div style={contentContainerStyle}>{children}</div>
      </div>
    </div>
  );
}

export default Layout;
