import React from 'react';
import Navbar from './Navbar';
import '../style/Home.css';

const HomePage = () => {
  return (
    <div className='homeRoot'>

      <Navbar />
      <main>
          <h3 className="Choose">Choose your subscribtion</h3>
          <div className="subs">
            <a className="sub" href="/login"></a>
            <a className="sub" href="/login"></a>
            <a className="sub" href="/login"></a>
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
