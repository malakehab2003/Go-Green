import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Policies from './components/Policies';
import Signup from './components/Signup';
import Purshase from './components/purshase';
import Div from './components/Dev';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import Profile from './components/Profile';

function App() {
  return (
    <div className='AppRoot'>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/policies" element={<Policies />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/purshase" element={<Purshase />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/div" element={<Div />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
