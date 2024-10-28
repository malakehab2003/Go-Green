import React, { useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/Login.css';

const Login = () => {
  const url = 'http://localhost:5000/api';
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [phoneError, setPhoneError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [validPhone, setValidPhone] = useState('');
  const [validPassword, setValidPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validPassword && validPhone) {
      try {
        const response = await axios.post(`${url}/login`, { phone: validPhone, password: validPassword  });
        const { token } = response.data;
  
        // save token in localStorage
        localStorage.setItem('token', token);
        navigate('/');
      } catch (err) {
        console.error('Login failed:', err);
        alert('Login failed. Please check your credentials and try again.');
      }
    }
  }

  const handlePhoneError = (event) => {
    const value = event.target.value;
    setPhone(value);
    if (value === '') {
      setPhoneError('phone number is required');
      return;
    }

    const phoneRegex = /^01\d{9}$/;
    if (!phoneRegex.test(value)) {
      setPhoneError('phone should be 11 number start with 01')
    } else {
      setValidPhone(value);
      setPhoneError(null);
    }
  }

  const handlePasswordError = (event) => {
    const value = event.target.value;
    setPassword(value);
    if (value === '') {
      setPasswordError('password is required');
      return;
    }

    const passRegex = /^.{4,}$/;
    if (!passRegex.test(value)) {
      setPasswordError('password should be at least 4 chars');
    } else {
      setValidPassword(value);
      setPasswordError(null);
    }
  }

  return (
    <div className='loginRoot'>
      <Navbar />
      <main>
      <div className="loginContainer">
        <h1>LOGIN</h1>
        <div className="line"></div>

        <form onSubmit={handleSubmit}>
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
            autoComplete="tel"
            />
          </div>
          {phoneError && (
							<p className='inputError'>{phoneError}</p>
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
            <button className="submitButton" type='submit'>Login</button>
          </div>
        </form>

        <div className="line2"></div>

        <p className="noAccountP">If you don't have an account</p>

        <a href="/policies"><button className="createAccount">Create an Account</button></a>

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

export default Login;