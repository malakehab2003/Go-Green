import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from "./Navbar";
import '../style/Signup.css';


const Signup = () => {
  const url = `${window.location.protocol}//${window.location.hostname}:5000/api`;
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [phoneError, setPhoneError] = useState(null);
  const [nameError, setNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [whatsappError, setWhatsappError] = useState(null);
  const [addressError, setAddressError] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState('');
  const [selectedPlaceError, setSelectedPlaceError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get(`${url}/getMe`, { headers: { Authorization: `Bearer ${token}` } })
        .then(response => setUser(response.data.user))
        .catch(() => setUser(null));
    }
  }, []);

  const handleSubmit = async (event) => {
    const agree = localStorage.getItem("agree");
    if (agree !== "true") {
      alert ('you have to agree policies first');
      navigate('/policies');
      return;
    }
    event.preventDefault();
    if (!user && !phoneError && !nameError && !passwordError && !addressError && !selectedPlaceError && !addressError && landmark) {
      try {
        const response = await axios.post(`${url}/createUser`, { phone, password, name, whatsapp, email, address, landmark, place: selectedPlace });
        const { token } = response.data;

        // save token in localStorage
        localStorage.setItem('token', token);
        navigate('/');
      } catch (err) {
        console.error('Login failed:', err);
        alert('Login failed. Please check your credentials and try again.');
      }
    } else {
      console.error('Login failed user logged in');
      alert('Login failed. Please check your credentials and try again or you are logged in.');
    }
  }

  const handleNameError = (event) => {
    const value = event.target.value;
    setName(value);
    if (value === '') {
      setNameError('name is required');
      return
    } else {
      setNameError('');
    }
  }

  const handlePhoneError = (event) => {
    const value = event.target.value;
    setPhone(value);
    const phoneRegex = /^01\d{9}$/;
    if (value === '') {
      setPhoneError('phone is required');
      return
    } else if (!phoneRegex.test(value)) {
      setPhoneError('phone should be 11 number start with 01');
    } else {
      setPhoneError('');
    }
  }

  const handleWhatsappError = (event) => {
    const value = event.target.value;
    setWhatsapp(value);
    const phoneRegex = /^01\d{9}$/;
    if (!phoneRegex.test(value)) {
      setWhatsappError('phone should be 11 number start with 01');
    } else {
      setWhatsappError('');
    }
  }

  const handleAddressError = (event) => {
    const value = event.target.value;
    setAddress(value);
    if (value === '') {
      setAddressError('Address is required');
      return
    } else {
      setAddressError('');
    }
  }

  const handleEmailError = (event) => {
    const value = event.target.value;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setEmail(value);
    if (!emailRegex.test(value)) {
      setEmailError('Email is invalid');
      return
    } else {
      setEmailError('');
    }
  }

  const handlePasswordError = (event) => {
    const value = event.target.value;
    setPassword(value);
    const passRegex = /^.{4,}$/;
    if (value === '') {
      setPasswordError('Password is required');
      return
    } else if (!passRegex.test(value)) {
      setPasswordError('Password should at least 4 chars');
    } else {
      setPasswordError('');
    }
  }

  const handleSelection = (event) => {
    const value = event.target.value;
    setSelectedPlace(value);
    if (!value) {
      setSelectedPlaceError('place is requried');
    } else {
      setSelectedPlaceError(null);
    }
  }

  return (
    <div className="signupRoot">
      <Navbar />
      <main>
      <div className="signupContainer">
        <h1>CREATE NEW ACCOUNT</h1>
        <div className="line"></div>

        <form onSubmit={handleSubmit}>
          <div className="nameContainer">
            <div className="nameIcon">
              <img src="/name.png" className="nameIcon" alt="name image"></img>
            </div>
            <input
            type="name"
            placeholder="name"
            className="nameInput"
            value={name}
            onChange={handleNameError}
            required
            />
          </div>
          {nameError && (
							<p className='inputError'>{nameError}</p>
						)}

          <div className="phoneContainer">
            <div className="phoneIcon">
              <img src="/phone.png" className="phoneIcon" alt="phone image"></img>
            </div>
            <input
              type="tel"
              placeholder="phone"
              className="phoneInput"
              value={phone}
              onChange={handlePhoneError}
              required
              />
          </div>
          {phoneError && (
							<p className='inputError'>{phoneError}</p>
						)}

          <div className="whatsappContainer">
            <div className="whatsappIcon">
              <img src="/whatsappsignup.png" className="whatsappIcon" alt="whatsapp image"></img>
            </div>
            <input
              type="tel"
              placeholder="whatsapp"
              className="whatsappInput"
              value={whatsapp}
              onChange={handleWhatsappError}
              required
              />
          </div>
          {whatsappError && (
							<p className='inputError'>{whatsappError}</p>
						)}

<div className="addressContainer">
            <div className="addressIcon">
              <img src="/address.png" className="addressIcon" alt="address image"></img>
            </div>
            <select 
              className="addressInput" 
              value={selectedPlace} 
              onChange={handleSelection}
              required
            >
              <option value="">Select a Place</option>
              <option value="قسم اول">قسم اول</option>
              <option value="قسم تاني">قسم تاني</option>
              <option value="استاد او سبرباي">استاد او سبرباي</option>
            </select>
          </div>
          {selectedPlaceError && (
							<p className='inputError'>{selectedPlaceError}</p>
						)}

          <div className="addressContainer">
            <div className="addressIcon">
              <img src="/address.png" className="addressIcon" alt="address image"></img>
            </div>
            <input
              type="address"
              placeholder="address"
              className="addressInput"
              value={address}
              onChange={handleAddressError}
              required
              />
          </div>
          {addressError && (
							<p className='inputError'>{addressError}</p>
						)}

          <div className="landmarkContainer">
            <div className="landmarkIcon">
              <img src="/address.png" className="landmarkIcon" alt="landmark image"></img>
            </div>
            <input
              type="landmark"
              placeholder="landmark"
              className="landmarkInput"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
              required
              />
          </div>

          <div className="emailContainer">
            <div className="emailIcon">
              <img src="/email.png" className="emailIcon" alt="email image"></img>
            </div>
            <input
              type="email"
              placeholder="email"
              className="emailInput"
              value={email}
              onChange={handleEmailError}
              autoComplete="username"
              />
          </div>
          {emailError && (
							<p className='inputError'>{emailError}</p>
						)}

          <div className="passwordContainer">
            <div className="passwordIcon">
              <img src="/password.png" className="passwordIcon" alt="password image"></img>
            </div>
            <input
              type="password"
              placeholder="password"
              className="passwordInput"
              value={password}
              onChange={handlePasswordError}
              required
              autoComplete="current-password"
              />
          </div>
          {passwordError && (
							<p className='inputError'>{passwordError}</p>
						)}

          <div className="submitContainer">
            <div className="submitIcon">
              <img src="/login.png" alt="submit image" className="submitIcon" />
            </div>
            <button className="submitButton" type="submit">Create account</button>
          </div>
        </form>

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


export default Signup;
