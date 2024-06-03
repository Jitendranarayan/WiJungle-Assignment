// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { processData } from '../dataProcessor';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    fetch('/eve.json')
      .then(response => response.json())
      .then(data => {
        const processedData = processData(data);
        setChartData(processedData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const categoryData = {
    labels: Object.keys(chartData.alertsByCategory || {}),
    datasets: [{
      label: 'Alerts by Category',
      data: Object.values(chartData.alertsByCategory || {}),
      backgroundColor: 'rgba(75,192,192,0.4)',
    }]
  };

  const severityData = {
    labels: Object.keys(chartData.alertsBySeverity || {}),
    datasets: [{
      label: 'Alerts by Severity',
      data: Object.values(chartData.alertsBySeverity || {}),
      backgroundColor: 'rgba(153,102,255,0.4)',
    }]
  };

  const timeData = {
    labels: Object.keys(chartData.alertsOverTime || {}),
    datasets: [{
      label: 'Alerts Over Time',
      data: Object.values(chartData.alertsOverTime || {}),
      backgroundColor: 'rgba(255,159,64,0.4)',
    }]
  };

  return (
    <div className="p-4 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl mb-4">Security Alerts Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-gray-800 p-4 rounded">
          <h2 className="text-xl mb-2">Alerts by Category</h2>
          <Pie data={categoryData} />
        </div>
        <div className="bg-gray-800 p-4 rounded">
          <h2 className="text-xl mb-2">Alerts by Severity</h2>
          <Bar data={severityData} />
        </div>
        <div className="bg-gray-800 p-4 rounded">
          <h2 className="text-xl mb-2">Alerts Over Time</h2>
          <Line data={timeData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
