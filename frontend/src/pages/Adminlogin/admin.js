import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './admin.css';
import logo from '../../images/logo.jpg';
import cricketLogo from '../../images/PLAYER.png';

const Admin = ({ setIsLoggedIn }) => {
  const [formData, setFormData] = useState({ name: '', password: '', email: '' });
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleLoginClick = async () => {
    try {
      const response = await axios.post('http://localhost:5000/adminlogin', formData);
      alert(response.data.message);

      if (response.data.message === 'OTP sent to email') {
        setIsOtpSent(true);
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert(error.response?.data?.message || 'An error occurred');
    }
  };

  const handleOtpSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/verifyotp', {
        email: formData.email,
        otp: otp,
      });

      alert(response.data.message);

      if (response.data.message === 'OTP verified, login successful') {
        navigate('/admindashboard');
      }
    } catch (error) {
      console.error('Error during OTP verification:', error);
      alert(error.response?.data?.message || 'Invalid OTP');
    }
  };

  return (
    <div className="container">
      <div className="navs">
        <img src={logo} alt="Logo" />
        <h1>SRKR CRICKET MANAGEMENT</h1>
      </div>
      <div className="signup" id="signupSection">
        <div className="system">
          <h2>Admin Login Page</h2>
          {!isOtpSent ? (
            <>
              <p>Enter your credentials to receive an OTP</p>
              <form>
                <label htmlFor="name">Name:</label>
                <input id="name" name="name" type="text" placeholder="Name" value={formData.name} onChange={handleInputChange} required />
                <label htmlFor="email">Email:</label>
                <input id="email" name="email" type="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required />
                <label htmlFor="password">Password:</label>
                <input id="password" name="password" type="text" placeholder="Password" value={formData.password} onChange={handleInputChange} required />
                <div className="button-container">
                  <button type="button" onClick={handleLoginClick} style={{ width: '20vh' }}>Get OTP</button>
                </div>
              </form>
            </>
          ) : (
            <>
              <p>Enter the OTP sent to your email</p>
              <input id="otp" name="otp" type="text" placeholder="OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required />
              <div className="button-container">
                <button type="button" onClick={handleOtpSubmit} style={{ width: '20vh' }}>Submit OTP</button>
              </div>
            </>
          )}
        </div>
        <div className="image">
          <img src={cricketLogo} alt="Cricket" />
        </div>
      </div>
    </div>
  );
};

export default Admin;
