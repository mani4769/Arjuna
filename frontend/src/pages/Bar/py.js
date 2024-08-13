import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Marts = () => {
  const [barData, setBarData] = useState(null);
  const [pieData, setPieData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/statistics')
      .then(response => {
        const data = response.data;
        if (data && data.barGraph && data.pieChart) {
          setBarData(`data:image/png;base64,${data.barGraph}`);
          setPieData(`data:image/png;base64,${data.pieChart}`);
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      {barData && <img src={barData} alt="Bar graph" />}
      {pieData && <img src={pieData} alt="Pie chart" />}
    </div>
  );
};

export default Marts;
