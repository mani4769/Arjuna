import React, { useState, useEffect } from 'react';
import './admindashboard.css';
import admindas from '../../images/admindas.png';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [userLen, setUserLen] = useState(0);
  const [teamLen, setTeamLen] = useState(0);
  const [scheduleLen, setScheduleLen] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users');
        setUserLen(response.data.length);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchTeamData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/teams');
        setTeamLen(response.data.length);
      } catch (error) {
        console.error('Error fetching team data:', error);
      }
    };

    const fetchScheduleData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/schedules');
        setScheduleLen(response.data.length);
      } catch (error) {
        console.error('Error fetching schedule data:', error);
      }
    };

    fetchUserData();
    fetchTeamData();
    fetchScheduleData();
  }, []);

  const data = {
    labels: ['Total Users', 'Total Teams', 'Total Schedules'],
    datasets: [
      {
        label: 'Number of Users',
        data: [userLen, 0, 0],
        backgroundColor: '#9a159a',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
    
      },
      {
        label: 'Number of Teams',
        data: [0, teamLen, 0],
        backgroundColor: '#39d3eb',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
      {
        label: 'Number of Schedules',
        data: [0, 0, scheduleLen],
        backgroundColor: 'purple',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
      x: {
        grid: {
          offset: true,
        },
        barPercentage: 0.5,
        categoryPercentage: 0.7,
        ticks: {
          font: {
            size: 24,
            float:'left'
          },
          padding: 20, 
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'User, Team, and Schedule Counts',
        font: {
          size: 34,
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };
  
  
  return (
    <div className="acontainer">
      <aside className="asidebar">
        <div className="alogo">
          <img src={admindas} alt="Admin Logo" />
        </div>
        <nav className="anav">
          <a href="/admindashboard" style={{ textDecoration: 'none' }}><button type="button" id="homebtn">Home</button></a>
          <a href="/registration" style={{ textDecoration: 'none' }}><button type="button" id="registerbtn">Register</button></a>
         <a href="/passwordpage" style={{ textDecoration: 'none' }}><button type="button" id="livescorebtn">Admin Acess</button></a>
        </nav>
      </aside>
      <main className="amain-content">
        <h1 className="aadmin-title">
          <span className="alarge">A</span>dmin <span className="alarge">I</span>nterface
          <i className="afas fa-heart heart-icon"></i>
        </h1>
        <div className="chart-grid">
          <div className="chart-container">
            <Bar data={data} options={options} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
