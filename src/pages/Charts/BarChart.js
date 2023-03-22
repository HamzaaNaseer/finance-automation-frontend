import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
const data = {
  labels: [
    "Jan",
    "Feb",
    "March",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      label: "Balance",
      data: [100, 200, 300, 100, 200, 300, 70, 100, 250, 190, 135, 175],
      backgroundColor: ["red", "green", "blue","cyan","grey","black","purple","teal","brown","indigo","yellow","magenta"],
    },
  ],
};
const BarChart = () => {
  return <Bar data={data} />;
};

export default BarChart;
