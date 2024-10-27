import React from "react";
import Navbar from "./Navbar";
import '../style/Signup.css';


const Signup = () => {
  return (
    <div className="signupRoot">
      <Navbar />
      <main>
      <div class="signupContainer">
        <h1>CREATE NEW ACCOUNT</h1>
        <div class="line"></div>

        <div class="nameContainer">
          <div class="nameIcon">
            <img src="/name.png" class="nameIcon" alt="name image"></img>
          </div>
          <input type="text" placeholder="name" class="nameInput" />
        </div>

        <div class="phoneContainer">
          <div class="phoneIcon">
            <img src="/phone.png" class="phoneIcon" alt="phone image"></img>
          </div>
          <input type="text" placeholder="phone" class="phoneInput" />
        </div>

        <div class="whatsappContainer">
          <div class="whatsappIcon">
            <img src="/whatsappsignup.png" class="whatsappIcon" alt="whatsapp image"></img>
          </div>
          <input type="text" placeholder="whatsapp" class="whatsappInput" />
        </div>

        <div class="addressContainer">
          <div class="addressIcon">
            <img src="/address.png" class="addressIcon" alt="address image"></img>
          </div>
          <input type="text" placeholder="address" class="addressInput" />
        </div>


        <div class="emailContainer">
          <div class="emailIcon">
            <img src="/email.png" class="emailIcon" alt="email image"></img>
          </div>
          <input type="text" placeholder="email" class="emailInput" />
        </div>

        <div class="passwordContainer">
          <div class="passwordIcon">
            <img src="/password.png" class="passwordIcon" alt="password image"></img>
          </div>
          <input type="text" placeholder="password" class="passwordInput" />
        </div>

        <div class="submitContainer">
          <div class="submitIcon">
            <img src="/login.png" alt="submit image" class="submitIcon" />
          </div>
          <a href="/"><button class="submitButton">Create account</button></a>
        </div>

      </div>
    </main>
    <footer>
      <div class="copyrite">
        <p>All rights reserved Ⓒ to 2024</p>
      </div>
    </footer>
    </div>
  );
}


export default Signup;
