import React from 'react';
import './App.css'; 

const Popup = ({ showPopup, closePopup }) => {
  return (
    <div className={`popup ${showPopup ? 'show' : ''}`} id="popup">
      <div className="image-container">
        <img src="/images/second.png" alt="Image 1" />
        <img src="/images/first.jpg" alt="Image 2" />
        <img src="/images/third.png" alt="Image 3" />
        <img src="/images/second.png" alt="Image 1" />
        <img src="/images/first.jpg" alt="Image 2" />
        <img src="/images/third.png" alt="Image 3" />
      </div>
      <hr />
      <br />
      <br />
      <br />
      <br />
      <br />
      <center onClick={closePopup} style={{ cursor: 'pointer' }}>
        <svg className="arrows">
          <path className="a1" d="M0 0 L30 32 L60 0"></path>
          <path className="a2" d="M0 20 L30 52 L60 20"></path>
          <path className="a3" d="M0 40 L30 72 L60 40"></path>
        </svg>
      </center>
    </div>
  );
};

export default Popup;
