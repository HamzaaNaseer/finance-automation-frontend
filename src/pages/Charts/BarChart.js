import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
const data = {
  labels: ["Jan", "Feb", "March", "Apr", "May", "June", "july"],
  datasets: [
    {
      label: "Tests",
      data: [100, 200, 300, 100, 200, 300, 70],
      backgroundColor: ["red", "green", "blue"],
    },
  ],
};
const BarChart = () => {
  return <Bar data={data} />;
};

export default BarChart;
