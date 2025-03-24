import React, { useState, useEffect } from "react";
import axios from 'axios';
import Navbar from "./Navbar";
import '../style/Profile.css';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const url = `${window.location.protocol}//${window.location.hostname}:5000/api`;
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      axios.get(`${url}/getMe`, { headers: { Authorization: `Bearer ${token}` } })
        .then(response => setUser(response.data.user))
        .catch(() => setUser(null));
    }
  }, []);

  const handleDeleteAccount = async () => {
    const isConfirmed = window.confirm("Are you sure you want to delete your account? This action cannot be undo.");
    if (isConfirmed) {
      try {
        await axios.delete(`${url}/deleteUser`, { headers: { Authorization: `Bearer ${token}` } });
        alert("Account deleted successfully.");
        navigate('/');
      } catch (error) {
        console.error("Error deleting account:", error);
        alert("An error occurred while deleting the account. Please try again.");
      }
    } else {
      alert("Account deletion canceled.");
    }
  }

  return (
    <div className="profileRoot">
      <Navbar />
        <main>
        <div className="signupContainer">
          <h1>PROFILE</h1>
          <div className="line"></div>

          <div className="dataContainer">
              <div className="dataIcon">
                  <p className="dataType">ID</p>
              </div>
              <div
              type="name"
              className="userData"
              >
                {user ? (
                  user._id.toString()
                ): (
                  "Not added"
                )}
              </div>
            </div>

            <div className="dataContainer">
              <div className="dataIcon">
                  <p className="dataType">NAME</p>
              </div>
              <div
              type="name"
              className="userData"
              >
                {user ? (
                  user.name
                ): (
                  "Not added"
                )}
              </div>
            </div>

            <div className="dataContainer">
              <div className="dataIcon">
                  <p className="dataType">PHONE</p>
              </div>
              <div
              type="name"
              className="userData"
              >
                {user ? (
                  user.phone
                ): (
                  "Not added"
                )}
              </div>
            </div>


            <div className="dataContainer">
              <div className="dataIcon">
                  <p className="dataType">ADDRESS</p>
              </div>
              <div
              type="name"
              className="userData"
              >
                {user ? (
                  user.address
                ): (
                  "Not added"
                )}
              </div>
            </div>

            <div className="dataContainer">
              <div className="dataIcon">
                  <p className="dataType">WHATSAPP</p>
              </div>
              <div
              type="name"
              className="userData"
              >
                {user ? (
                  user.whatsapp
                ): (
                  "Not added"
                )}
              </div>
            </div>

            <div className="dataContainer">
              <div className="dataIcon">
                  <p className="dataType">EMAIL</p>
              </div>
              <div
              type="name"
              className="userData"
              >
                {user ? (
                  user.email
                ): (
                  "Not added"
                )}
              </div>
            </div>

            <div className="dataContainer">
              <div className="dataIcon">
                  <p className="dataType">LANDMARK</p>
              </div>
              <div
              type="name"
              className="userData"
              >
                {user ? (
                  user.landmark
                ): (
                  "Not added"
                )}
              </div>
            </div>

            <div className="dataContainer">
              <div className="dataIcon">
                  <p className="dataType">PLACE</p>
              </div>
              <div
              type="name"
              className="userData"
              >
                {user ? (
                  user.place
                ): (
                  "Not added"
                )}
              </div>
            </div>

            <div className="dataContainer">
              <div className="dataIcon">
                  <p className="dataType">POINTS</p>
              </div>
              <div
              type="name"
              className="userData"
              >
                {user ? (
                  user.points
                ): (
                  "Not added"
                )}
              </div>
            </div>

            <div className="dataContainer">
              <div className="dataIcon">
                  <p className="dataType">PAYMENT STATE</p>
              </div>
              <div
              type="name"
              className="userData"
              >
                {user ? (
                  user.is_paid
                ): (
                  "Not added"
                )}
              </div>
            </div>

            <div className="dataContainer">
              <div className="dataIcon">
                  <p className="dataType">SUBSCRIBTION</p>
              </div>
              <div
              type="name"
              className="userData"
              >
                {user ? (
                  user.sub
                ): (
                  "Not added"
                )}
              </div>
            </div>

            <div className="submitContainer">
              <div className="deleteAccount">
                <button className="deleteButton" onClick={handleDeleteAccount}>Delete Account</button>
              </div>
            </div>

        </div>
      </main>
      <footer>
        <div className="copyrite">
          <p>All rights reserved Ⓒ to 2024</p>
        </div>
      </footer>
    </div>
  );
}

export default Profile;
