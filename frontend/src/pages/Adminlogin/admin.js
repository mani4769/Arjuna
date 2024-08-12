import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './admin.css';
import logo from '../../images/logo.jpg';
import cricketLogo from '../../images/PLAYER.png';

const Admin = ({ setIsLoggedIn }) => {
  const [formData, setFormData] = useState({ name: '', regNo: '', email: '' });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleLoginClick = async () => {
    console.log('Login button clicked');
    try {
      const response = await axios.post('http://localhost:5000/adminlogin', formData);
      console.log('Server Response:', response);
      alert(response.data.message);
  
      if (response.data.message === 'Login successful and email sent') {
        console.log('Navigating to /admin-dashboard');
        navigate('/admindashboard'); 
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert(error.response?.data?.message || 'An error occurred');
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
          <p>Enter your credentials to sign up or log in</p>
          <form>
            <label htmlFor="name">Name:</label>
            <input id="name" name="name" type="text" placeholder="Name" value={formData.name} onChange={handleInputChange} required />
            <label htmlFor="regNo">Password:</label>
            <input id="regNo" name="regNo" type="text" placeholder="Password" value={formData.regNo} onChange={handleInputChange} required />
            <label htmlFor="email">Email:</label>
            <input id="email" name="email" type="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required />
            <div className="button-container">
              <button type="button" onClick={handleLoginClick}>Login</button>
            </div>
          </form>
        </div>
        <div className="image">
          <img src={cricketLogo} alt="Cricket" />
        </div>
      </div>
    </div>
  );
};

export default Admin;
