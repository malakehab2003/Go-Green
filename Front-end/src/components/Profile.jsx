import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from "./Navbar";
import '../style/Profile.css';

const Profile = () => {
  const url = 'http://localhost:5000/api';
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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
      
    </div>
  );
}

export default Profile;
