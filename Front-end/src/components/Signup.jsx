import React from "react";
import Navbar from "./Navbar";
import '../style/Signup.css';


const Signup = () => {
  return (
    <div className="signupRoot">
      <Navbar />
      <main>
      <div className="signupContainer">
        <h1>CREATE NEW ACCOUNT</h1>
        <div className="line"></div>

        <div className="nameContainer">
          <div className="nameIcon">
            <img src="/name.png" className="nameIcon" alt="name image"></img>
          </div>
          <input type="text" placeholder="name" className="nameInput" />
        </div>

        <div className="phoneContainer">
          <div className="phoneIcon">
            <img src="/phone.png" className="phoneIcon" alt="phone image"></img>
          </div>
          <input type="text" placeholder="phone" className="phoneInput" />
        </div>

        <div className="whatsappContainer">
          <div className="whatsappIcon">
            <img src="/whatsappsignup.png" className="whatsappIcon" alt="whatsapp image"></img>
          </div>
          <input type="text" placeholder="whatsapp" className="whatsappInput" />
        </div>

        <div className="addressContainer">
          <div className="addressIcon">
            <img src="/address.png" className="addressIcon" alt="address image"></img>
          </div>
          <input type="text" placeholder="address" className="addressInput" />
        </div>


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
          <a href="/"><button className="submitButton">Create account</button></a>
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


export default Signup;
