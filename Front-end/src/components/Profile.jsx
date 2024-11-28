import React, { useState, useEffect } from "react";
import axios from 'axios';
import Navbar from "./Navbar";
import '../style/Profile.css';

const Profile = () => {
  const url = 'http://192.168.1.77:5000/api';
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get(`${url}/getMe`, { headers: { Authorization: `Bearer ${token}` } })
        .then(response => setUser(response.data.user))
        .catch(() => setUser(null));
    }
  }, []);

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
