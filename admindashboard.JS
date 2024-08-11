import React from 'react';
import './admindashboard.css';
import admin from '../../images/profile00.jpg';

const Dashboard = () => {
  return (
    <div className="acontainer">
      <aside className="asidebar">
        <div className="alogo">
          <img src={admin} alt="IPL Logo" />
        </div>
        <nav className="anav">
        {/* <a href="/admindashboard" className="anav-item" style={{color:'black',fontFamily:'Lucida Bright',marginBottom:'3vh'}}>
        <h3 style={{marginBottom:'200vh',paddingTop:'-3vh'}}>HOME</h1></a>
          <a href="/registration" className="anav-item"><p>REGISTER</p></a>
          <a href="schedule" className="anav-item"><p>SCHEDULES</p></a>
          <a href="adminlivescore" className="anav-item"><p>LIVE SCORE</p></a> */}
       
        <a href='/admindashboard' style={{textDecoration:'none'}}><button type="button" id="homebtn" style={{color:'white',fontSize:'2.5vh'}}>Home</button></a>
        <a href='/registration' style={{textDecoration:'none'}}><button type="button" id="registerbtn" style={{color:'white',fontSize:'2.5vh'}}>Register</button></a>
        <a href='/schedule' style={{textDecoration:'none'}}><button type="button" id="schedulesbtn" style={{color:'white',fontSize:'2.5vh'}}>Schedules</button></a>
        <a href='/livescore' style={{textDecoration:'none'}}> <button type="button" id="livescorebtn" style={{color:'white',fontSize:'2.5vh'}}>Live Score</button></a>

        </nav>
      </aside>
      <main className="amain-content">
        <h1 className="aadmin-title">
          <span className="alarge">A</span>dmin <span className="alarge">I</span>nterface
          <i className="afas fa-heart heart-icon"></i>
        </h1>
      </main>
    </div>
  );
};

export default Dashboard;
