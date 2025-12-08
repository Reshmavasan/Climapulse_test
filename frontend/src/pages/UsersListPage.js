import React, { useEffect, useState } from "react";
import { fetchUsers, addUser } from "../api";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

import "../css/UsersList.css";

// Images
import searchIcon from "../images/search.svg";
import arrowDownIcon from "../images/keyboard_arrow_down.svg";
import addIcon from "../images/add.svg";
import arrowRightIcon from "../images/keyboard_arrow_right.svg";
import arrowLeftIcon from "../images/keyboard_arrow_left.svg";

function UsersListPage() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterCompany, setFilterCompany] = useState("All");

  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showCompanyDropdown, setShowCompanyDropdown] = useState(false);

  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 15;

  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers()
      .then(setUsers)
      .catch(err => setError("Unable to load users."));
  }, []);

  const handleCreateUser = async () => {        // function to create new user
    const newUser = {
      firstName: "New",
      lastName: "User",
      phone: "000-000-0000",
      type: "default",
      status: "active",
      companyName: "Unknown",
    };
    try {
      const created = await addUser(newUser);
      setUsers(prev => [...prev, created]);
      alert(`New user created: ${created.firstName} ${created.lastName}`);
    } catch (err) {
      setError("Failed to create user.");
    }
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch = `${u.firstName} ${u.lastName}`.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === "All" ? true : u.type === filterType;
    const matchesStatus = filterStatus === "All" ? true : u.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesCompany = filterCompany === "All" ? true : u.companyName === filterCompany;
    return matchesSearch && matchesType && matchesStatus && matchesCompany;
  });

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);

  const typeOptions = [...new Set(users.map(u => u.type))];
  const statusOptions = [...new Set(users.map(u => u.status.toLowerCase()))];
  const companyOptions = [...new Set(users.map(u => u.companyName))];

  const handlePrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const handleGoToPage = (page) => setCurrentPage(page);

  return (
    <Layout>
      {/* Search bar */}
      <div className="search-bar-container">
        <div className="search-input">
          <div className="search-bar">
            <img src={searchIcon} alt="search" className="search-icon" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <div className="filter-bar">
            {/* Filter by Type */}
            <div className="filter-item">
              <span className="filter-label">Type</span>
              <span className="filter-value">
                {filterType}
                <img src={arrowDownIcon} alt="arrow" onClick={() => setShowTypeDropdown(!showTypeDropdown)} style={{ cursor: "pointer" }} />
              </span>
              {showTypeDropdown && (
                <div className="filter-dropdown">
                  <div className="filter-option" onClick={() => { setFilterType("All"); setShowTypeDropdown(false); }}>All</div>
                  {typeOptions.map(type => (
                    <div key={type} className="filter-option" onClick={() => { setFilterType(type); setShowTypeDropdown(false); }}>{type}</div>
                  ))}
                </div>
              )}
            </div>

            {/* Filter by Status */}
            <div className="filter-item">
              <span className="filter-label">State</span>
              <span className="filter-value">
                {filterStatus}
                <img src={arrowDownIcon} alt="arrow" onClick={() => setShowStatusDropdown(!showStatusDropdown)} style={{ cursor: "pointer" }} />
              </span>
              {showStatusDropdown && (
                <div className="filter-dropdown">
                  <div className="filter-option" onClick={() => { setFilterStatus("All"); setShowStatusDropdown(false); }}>All</div>
                  {statusOptions.map(status => (
                    <div key={status} className="filter-option" onClick={() => { setFilterStatus(status); setShowStatusDropdown(false); }}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Filter by Company name */}
            <div className="filter-item">
              <span className="filter-label">Company</span>
              <span className="filter-value">
                {filterCompany}
                <img src={arrowDownIcon} alt="arrow" onClick={() => setShowCompanyDropdown(!showCompanyDropdown)} style={{ cursor: "pointer" }} />
              </span>
              {showCompanyDropdown && (
                <div className="filter-dropdown">
                  <div className="filter-option" onClick={() => { setFilterCompany("All"); setShowCompanyDropdown(false); }}>All</div>
                  {companyOptions.map(company => (
                    <div key={company} className="filter-option" onClick={() => { setFilterCompany(company); setShowCompanyDropdown(false); }}>{company}</div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <button className="create-button" onClick={handleCreateUser}>
          <img src={addIcon} alt="add" className="add-icon" />
          <span className="add-text">Create new</span>
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {/* Table container to display the users */}
      <div className="table-container">
        <div className="table-content">
          <div className="table-header">
            <span className="header-name">Name</span>
            <span className="header-phone">Phone</span>
            <span className="header-type">Type</span>
            <span className="header-status">State</span>
            <span className="header-company">Company</span>
            <span className="header-arrow"></span>
          </div>

          <div className="table-rows">
            {paginatedUsers.map(user => (

              <div
                className="row"
                key={user.id}
                onClick={() => navigate(`/users/${user.id}`)}
                style={{ cursor: "pointer" }}
              >
                <div className="col-name-email">
                  <span className="name-text">{user.firstName} {user.lastName}</span>
                  <span className="email-text">{user.email}</span>
                </div>
                <div className="col-phone">
                  <span className="phone-text">{user.phone}</span>
                </div>
                <div className="col-type">
                  <div className={`type-button ${user.type.toLowerCase()}`}>
                    <span className="type-text">{user.type}</span>
                  </div>
                </div>
                <div className="col-status">
                  <span className={`status-text ${user.status.toLowerCase()}`}>
                    {user.status}
                  </span>
                </div>
                <div className="col-company">
                  <span className="company-text">{user.companyName}</span>
                </div>

                <div
                  className="arrow-container"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/users/${user.id}`);
                  }}
                >
                  <img src={arrowRightIcon} alt="open" className="arrow-icon" />
                </div>
              </div>
            ))}

            {paginatedUsers.length === 0 && <div className="no-results">No users found.</div>}
          </div>
        </div>
      </div>

      {/* Container to handle pagination */}
      <div className="pagination-container">
        <div className="icon-prev" onClick={handlePrevPage}>
          <img src={arrowLeftIcon} alt="previous" className="arrow-pagination-icon" />
        </div>
        <div className="page-numbers">
          {Array.from({ length: totalPages }, (_, i) => (
            <span
              key={i + 1}
              className={`page-number ${currentPage === i + 1 ? "active-page" : ""}`}
              onClick={() => handleGoToPage(i + 1)}
            >
              {i + 1}
            </span>
          ))}
        </div>
        <div className="icon-next" onClick={handleNextPage}>
          <img src={arrowRightIcon} alt="next" className="arrow-pagination-icon" />
        </div>
      </div>

    </Layout>
  );
}

export default UsersListPage;
