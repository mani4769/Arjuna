import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './signup.css';
import logo from '../../images/logo.jpg';
import cricketLogo from '../../images/cricketlogo.jpg.png';
import videosrc from '../../images/video.mp4';
import Popup from '../../popup'; // Ensure Popup is imported

const SignupPage = ({ setIsLoggedIn }) => {
  const [isVideoOverlayActive, setIsVideoOverlayActive] = useState(false);
  const [isSignupHidden, setIsSignupHidden] = useState(false);
  const [formData, setFormData] = useState({ name: '', regNo: '', email: '' });
  const [showPopup, setShowPopup] = useState(false); // Manage popup visibility

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/signup', formData);
      alert(response.data.message); // Access the 'message' property
      setFormData({ name: '', regNo: '', email: '' });
    } catch (error) {
      alert(error.response.data.message || 'An error occurred');
    }
  };

  const handleLoginClick = async () => {
    console.log('Login button clicked');
    try {
      const response = await axios.post('http://localhost:5000/login', { regNo: formData.regNo });
      alert(response.data.message); // Access the 'message' property
      setIsVideoOverlayActive(true);
  
      // Store user details in localStorage
      localStorage.setItem('userDetails', JSON.stringify(formData));
  
      setTimeout(() => {
        console.log('Hiding signup section');
        setIsSignupHidden(true);
        setIsLoggedIn(true);
        navigate('/homepage');
      }, 5000);
    } catch (error) {
      alert(error.response.data.message || 'An error occurred');
    }
  };

  const handleVideoEnd = () => {
    setIsVideoOverlayActive(false);
    setShowPopup(true); // Show the popup after video ends
  };

  return (
    <div className="container">
      <div className="navs">
        <img src={logo} alt="Logo" />
        <h1>SRKR CRICKET MANAGEMENT</h1>
      </div>
      <div className={`signup ${isSignupHidden ? 'slideUp hide' : ''}`} id="signupSection">
        <div className="system">
          <h2>SIGNUP AND LOGIN</h2>
          <p>Enter your credentials to sign up or log in</p>
          <form onSubmit={handleSignupSubmit}>
            <label htmlFor="name">Name:</label>
            <input id="name" name="name" type="text" placeholder="Name" value={formData.name} onChange={handleInputChange} required />
            <label htmlFor="regNo">Registration Number:</label>
            <input id="regNo" name="regNo" type="text" placeholder="Registration Number" value={formData.regNo} onChange={handleInputChange} required />
            <label htmlFor="email">Email:</label>
            <input id="email" name="email" type="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required />
            <div className="button-container">
              <button type="submit">Sign In</button>
              <button type="button" onClick={handleLoginClick}>Login</button>
            </div>
          </form>
        </div>
        <div className="image">
          <img src={cricketLogo} alt="Cricket" />
        </div>
      </div>
      <div className={`videoOverlay ${isVideoOverlayActive ? 'active' : ''}`}>
        <video id="video" autoPlay muted onEnded={handleVideoEnd}>
          <source src={videosrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <Popup showPopup={showPopup} closePopup={() => setShowPopup(false)} /> {/* Render Popup */}
    </div>
  );
}

export default SignupPage;
