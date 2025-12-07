import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import UsersListPage from "./pages/UsersListPage";
import UserDetailPage from "./pages/UserDetailPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/users" replace />} />
        <Route path="/users" element={<UsersListPage />} />
        <Route path="/users/:id" element={<UserDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;

