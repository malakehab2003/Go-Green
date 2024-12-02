import React, { useState } from 'react';
import axios from 'axios';
import '../style/Dev.css';
import Navbar from './Navbar';


const Dev = () => {
  const url = `${window.location.protocol}//${window.location.hostname}:5000/api`;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [userId, setUserId] = useState('');
  const [points, setPoints] = useState('');
  const [payment, setPayment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handlePasscodeSubmit = async (e) => {
    e.preventDefault();
    if (passcode === 'M@!J&&BEGREEN&&#') { 
      setIsAuthenticated(true);
      setErrorMessage('');
    } else {
      setErrorMessage('Incorrect password, please try again.');
    }
  };

  const handlePointsUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${url}/updatePoints`, { points, id: userId });
      alert('Points updated successfully');
      setUserId('');
      setPoints('');
    } catch (error) {
      alert('Failed to update points');
      console.error('Error updating points:', error);
    }
  };

  const changePayment = async (e) => {
    e.preventDefault();
    try{
      await axios.put(`${url}/isPaid`, { pay: payment, id: userId });
      alert('Payment updated successfully');
      setUserId('');
      setPoints('');
    } catch (err) {
      alert('Failed to update payment');
      console.error('Error updating payment:', err);
    }
  }

  return (
    <div className='divRoot'>
      <Navbar />
      <div className="admin-container">
        {!isAuthenticated ? (
          <form onSubmit={handlePasscodeSubmit} className="passcode-form">
            <label>Enter Admin Password:</label>
            <input
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="passcode-input"
            />
            <button type="submit" className="submit-button">Login</button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </form>
        ) : (
          <form onSubmit={handlePointsUpdate} className="points-form">
            <div className="input-container">
              <label>User ID:</label>
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="user-id-input"
              />
            </div>
            <div className="input-container">
              <label>Points to Add:</label>
              <input
                type="number"
                value={points}
                onChange={(e) => setPoints(e.target.value)}
                className="points-input"
              />
            </div>

            <button type="submit" className="submit-button">Add Points</button>

            <div className="input-container">
              <label>payment state:</label>
              <input
                type="text"
                value={payment}
                onChange={(e) => setPayment(e.target.value)}
                className="user-id-input"
              />
            </div>

            <button onClick={changePayment} className="submit-button">change payment</button>

          </form>
        )}
      </div>
    </div>
  );

}
export default Dev;
