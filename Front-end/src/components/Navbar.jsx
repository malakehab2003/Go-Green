import React from 'react';
import '../style/Navbar.css';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate('/');
    setTimeout(() => {
      document.getElementById('footer').scrollIntoView({ behavior: 'smooth' });
    }, 0);
  };

  return (
    <div className='navRoot'>
      <header>
            <a className="logo" href="#">Lorem</a>
            <div className="navBar">
                <a className="navItem" href="#">Home</a>
                <a className="navItem" href="./login.html">Login</a>
                <a className="navItem" href="/about">About</a>
                <a className="navItem" onClick={handleContactClick}>Contact</a>
            </div>
        </header>
        <nav className="navbar bg-body-tertiary fixed-top">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">Lorem</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Lorem</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
              <div className="offcanvas-body">
                <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">Home</a>
                  </li>
      
                  <li className="nav-item">
                    <a className="nav-link active" href="./login.html">Login</a>
                  </li>
      
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="./about">About</a>
                  </li>
      
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#footer">Contact</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
    </div>
  );
};

export default Navbar;
