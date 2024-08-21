import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './passwordpage.css';

const VerifyPasswordPage = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/verifypassword', { password });

      if (response.data.message === 'Password correct, proceed to the next page') {
        navigate('/superadmin'); 
      } else {
        alert('Invalid password');
      }
    } catch (error) {
      console.error('Error verifying password:', error);
      alert('Failed to verify password. Please try again.');
    }
  };

  return (
    <div className="password-form">
      <h1>Enter Admin Password</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-item">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" style={{width: '100%',padding: '10px',fontsize: '16px',color: '#fff',backgroundcolor: '#007bff',border: 'none'}}>Submit</button>
      </form>
    </div>
  );
};

export default VerifyPasswordPage;
