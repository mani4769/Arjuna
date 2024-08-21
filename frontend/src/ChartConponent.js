// /frontend/src/ChartComponent.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ChartComponent() {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/api/bar-chart')
            .then(response => {
                const imgSrc = `data:image/png;base64,${response.data.image}`;
                setChartData(imgSrc);
            })
            .catch(error => console.error('Error fetching the chart:', error));
    }, []);

    return (
        <div>
            {chartData ? <img src={chartData} alt="Bar Chart" /> : <p>Loading...</p>}
        </div>
    );
}

export default ChartComponent;