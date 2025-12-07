import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchUserById, deleteUser, updateUser } from "../api";
import Layout from "../components/Layout";
import EditModal from "../components/EditModal";

// Icons
import editIcon from "../images/edit.png";
import trashIcon from "../images/delete.png";

import "../css/UserDetail.css";

function UserDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // Modal state
  const [editModal, setEditModal] = useState(null); // 'personal' | 'company' | null
  const [editData, setEditData] = useState({});

  useEffect(() => {
    fetchUserById(id)
      .then(setUser)
      .catch(() => setError("Failed to load user."));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(id);
      navigate("/users");
    } catch {
      setError("Failed to delete user.");
    }
  };

  const handleUpdate = async () => {
    try {
      // Merge updated section with original user
      const updatedUser = await updateUser(id, { ...user, ...editData });
      setUser(updatedUser);
      setEditModal(null);
    } catch {
      alert("Failed to update user.");
    }
  };

  if (error) return <p className="error">{error}</p>;
  if (!user) return <p>Loading…</p>;

  return (
    <Layout>
      {/* USER HEADER */}
      <div className="user-title-container">
        <div className="userinfo">
          <span className="username">
            {user.firstName} {user.lastName}
          </span>

          <div className="type-status">
            <div className={`type-button ${user.type?.toLowerCase()}`}>
              <span className="type-text">{user.type}</span>
            </div>
            <span className={`status-text ${user.status?.toLowerCase()}`}>
              {user.status}
            </span>
          </div>
        </div>

        <button className="delete-user-btn" onClick={handleDelete}>
          <img src={trashIcon} alt="delete" />
          <span>Delete user</span>
        </button>
      </div>

      {/* PERSONAL INFO */}
      <div className="detail-card">
        <div className="detail-card-header">
          <span className="card-title">Personal information</span>
          <button
            className="edit-btn"
            onClick={() => {
              setEditData({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
                bio: user.bio || "",
              });
              setEditModal("personal");
            }}
          >
            <img src={editIcon} alt="edit" />
            <span>Edit</span>
          </button>
        </div>

        <div className="personal-info-container">
          <div className="info-field">
            <label>First name</label>
            <p>{user.firstName}</p>
          </div>

          <div className="info-field">
            <label>Last name</label>
            <p>{user.lastName}</p>
          </div>

          <div className="info-field">
            <label>Email</label>
            <p>{user.email}</p>
          </div>

          <div className="info-field">
            <label>Phone</label>
            <p>{user.phone}</p>
          </div>

          <div className="info-field full-width">
            <label>Bio</label>
            <p>{user.bio || "—"}</p>
          </div>
        </div>
      </div>

      {/* COMPANY INFO */}
      <div className="detail-card">
        <div className="detail-card-header">
          <span className="card-title">Company</span>
          <button
            className="edit-btn"
            onClick={() => {
              setEditData({
                companyName: user.companyName,
                country: user.country,
                city: user.city,
                postalCode: user.postalCode,
                address: user.address,
                vatNumber: user.vatNumber,
              });
              setEditModal("company");
            }}
          >
            <img src={editIcon} alt="edit" />
            <span>Edit</span>
          </button>
        </div>

        <div className="company-info">
          <div className="info-field full-width">
            <label>Name</label>
            <p>{user.companyName}</p>
          </div>

          <div className="info-field">
            <label>Country</label>
            <p>{user.country}</p>
          </div>

          <div className="info-field">
            <label>City</label>
            <p>{user.city}</p>
          </div>

          <div className="info-field">
            <label>Postal code</label>
            <p>{user.postalCode}</p>
          </div>

          <div className="info-field">
            <label>Street</label>
            <p>{user.address}</p>
          </div>

          <div className="info-field full-width">
            <label>VAT</label>
            <p>{user.vatNumber}</p>
          </div>
        </div>
      </div>

      {/* EDIT MODAL */}
      {editModal && (
        <EditModal
          title={editModal === "personal" ? "Edit Personal Information" : "Edit Company Information"}
          data={editData}
          setData={setEditData}
          onClose={() => setEditModal(null)}
          onSubmit={handleUpdate}
          fields={
            editModal === "personal"
              ? [
                  { key: "firstName", label: "First Name" },
                  { key: "lastName", label: "Last Name" },
                  { key: "email", label: "Email", type: "email" },
                  { key: "phone", label: "Phone" },
                  { key: "bio", label: "Bio" },
                ]
              : [
                  { key: "companyName", label: "Company Name" },
                  { key: "country", label: "Country" },
                  { key: "city", label: "City" },
                  { key: "postalCode", label: "Postal Code" },
                  { key: "address", label: "Street" },
                  { key: "vatNumber", label: "VAT" },
                ]
          }
        />
      )}
    </Layout>
  );
}

export default UserDetailPage;
