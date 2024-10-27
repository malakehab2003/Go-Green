import React from 'react';
import Navbar from './Navbar';
import '../style/Login.css';

const Login = () => {
  return (
    <div className='loginRoot'>
      <Navbar />
      <main>
      <div className="loginContainer">
        <h1>LOGIN</h1>
        <div className="line"></div>

        <div className="emailContainer">
          <div className="emailIcon">
            <img src="/email.png" className="emailIcon" alt="email image"></img>
          </div>
          <input type="text" placeholder="email" className="emailInput" />
        </div>

        <div className="passwordContainer">
          <div className="passwordIcon">
            <img src="/password.png" className="passwordIcon" alt="password image"></img>
          </div>
          <input type="text" placeholder="password" className="passwordInput" />
        </div>

        <div className="submitContainer">
          <div className="submitIcon">
            <img src="/login.png" alt="submit image" className="submitIcon" />
          </div>
          <a href="/"><button className="submitButton">Login</button></a>
        </div>

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