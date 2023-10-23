import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../MyNavbar/MyNavbar.css";

function MyNavbar() {
  const { logout } = useAuth();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
      window.location.replace("/");
    }
  };

  return (
    <div className="sidebar">
      <div>
        <img src="/logo.png" width={170} height={60} alt="logo" />
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/home/appointments">Pending Reservations</Link>
          </li>
          <li>
            <Link to="/home/confirm">Confirmed Reservation</Link>
          </li>
        </ul>
        <button className="sidebar-btn" onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </div>
  );
}

export default MyNavbar;
