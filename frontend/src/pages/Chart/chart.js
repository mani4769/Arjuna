import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

const Chart = () => {
     
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('/api/collection-stats');
        const collectionNames = response.data.map(stat => stat.name);
        const memberCounts = response.data.map(stat => stat.count);

        setChartData({
          labels: collectionNames,
          datasets: [
            {
              label: 'Number of Members Registered',
              data: memberCounts,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching collection stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h2>Registered Members per Collection</h2>
      <Bar
        data={chartData}
        options={{
          scales: {
            x: {
              title: {
                display: true,
                text: 'Collections',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Number of Members Registered',
              },
            },
          },
        }}
      />
    </div>
  );
};

export default Chart;
