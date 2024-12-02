import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import '../style/Home.css';
import { useNavigate } from 'react-router-dom';


const HomePage = () => {
  const url = `${window.location.protocol}//${window.location.hostname}:5000/api`;
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

  const handlePurshase = async (sub) => {
    if (!user) {
      alert('Log in first');
      navigate('/login')
    } else {
      const response = await axios.put(`${url}/chooseSub`, {
         sub
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
      });
      navigate('/purshase');
    }
  }

  const handleLockedPurshase = (e) => {
    alert('Not allowed right now, First subscription is just allowed');
  }

  return (
    <div className='homeRoot'>

      <Navbar />
      <main>
          <h3 className="Choose">Choose your subscribtion</h3>
          <div className="subs">
            <img className="sub" alt='sub' src='/sub.jpg' onClick={() => handlePurshase('first choice')}></img>
            <img className="subLocked" alt='sub' src='/sub.jpg' onClick={() => handleLockedPurshase()}></img>
            <img className="subLocked" alt='sub' src='/sub.jpg' onClick={() => handleLockedPurshase()}></img>
          </div>
          <p className="homeP">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi</p>
        </main>
        <footer id="footer">
          <h3 className="contactUs">Contact us</h3>
          <div className="contacts">

            <a href="#" className="contact">
              <img className="contact" src="/facebook.png" alt="facebook" />
            </a>

            <a href="#" className="contact">
              <img className="contact" src="/instagram.png" alt="instagram" />
            </a>

            <a href="#" className="contact">
              <img className="contact" src="/whatsapp.png" alt="whatsapp" />
            </a>

          </div>

          <p className="copyrite">All rights reserved Ⓒ to 2024</p>
        </footer>
    </div>
  );
};

export default HomePage;
