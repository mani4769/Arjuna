import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import './chart.css'; // Make sure to import the CSS file here

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [userLen, setUserLen] = useState(0);
  const [teamLen, setTeamLen] = useState(0);
  const [scheduleLen, setScheduleLen] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://arjuna-six.vercel.app/api/users');
        setUserLen(response.data.length);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchTeamData = async () => {
      try {
        const response = await axios.get('https://arjuna-six.vercel.app/api/teams');
        setTeamLen(response.data.length);
      } catch (error) {
        console.error('Error fetching team data:', error);
      }
    };

    const fetchScheduleData = async () => {
      try {
        const response = await axios.get('https://arjuna-six.vercel.app/api/schedules');
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
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Number of Teams',
        data: [0, teamLen, 0],
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
      {
        label: 'Number of Schedules',
        data: [0, 0, scheduleLen],
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
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
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'User, Team, and Schedule Counts',
      },
    },
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="chart-container">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default Dashboard;
